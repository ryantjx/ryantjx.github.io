#!/usr/bin/env python3
"""
Script to scrape Substack Notes using Selenium
Runs automatically via GitHub Actions every 6 hours
Can also be run manually: python scripts/scrape-notes.py
"""

import json
import os
import sys
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

NOTES_URL = 'https://substack.com/@ryantjx'
OUTPUT_FILE = 'assets/data/notes.json'

def scrape_notes():
    """Scrape notes from Substack using Selenium"""
    print(f"🔍 Scraping notes from {NOTES_URL}...")
    
    # Set up Chrome options for headless mode
    chrome_options = Options()
    chrome_options.add_argument('--headless=new')  # New headless mode
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    # Try to use chromium-chromedriver in CI, otherwise use default
    driver = None
    try:
        # For GitHub Actions CI environment
        service = Service('/usr/bin/chromedriver')
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except Exception as e:
        print(f"⚠️  Trying alternative driver initialization: {e}")
        try:
            # Fallback to default
            driver = webdriver.Chrome(options=chrome_options)
        except Exception as e2:
            print(f"❌ Failed to initialize Chrome driver: {e2}")
            return []
    
    if not driver:
        print("❌ Could not initialize browser driver")
        return []
    
    try:
        # Load the page
        print("📄 Loading page...")
        driver.get(NOTES_URL)
        
        # Wait for notes to load (adjust selector as needed)
        wait = WebDriverWait(driver, 15)
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Give it extra time for JavaScript to render
        import time
        time.sleep(8)  # Increased wait time for dynamic content on profile page
        
        notes = []
        
        # Try multiple selectors to find notes/posts on the profile page
        # Substack profile pages have different structure than /notes pages
        selectors = [
            'article[data-post-id]',  # Articles with post IDs
            'div[class*="post"]',  # Divs with "post" in class name
            'a[href*="/p/"]',  # Links to posts (/p/ pattern)
            'div[class*="note"]',  # Divs with "note" in class name
        ]
        
        all_items = []
        for selector in selectors:
            items = driver.find_elements(By.CSS_SELECTOR, selector)
            if items:
                all_items.extend(items)
                print(f"📝 Found {len(items)} items with selector: {selector}")
        
        # Remove duplicates
        seen = set()
        unique_items = []
        for item in all_items:
            try:
                item_html = item.get_attribute('outerHTML')[:100]  # Use first 100 chars as fingerprint
                if item_html not in seen:
                    seen.add(item_html)
                    unique_items.append(item)
            except:
                continue
        
        print(f"📝 Processing {len(unique_items)} unique items...")
        
        for item in unique_items[:10]:  # Limit to 10 notes
            try:
                # Try to find a link within the item
                link_elem = None
                href = None
                
                # Check if the item itself is a link
                if item.tag_name == 'a':
                    link_elem = item
                    href = item.get_attribute('href')
                else:
                    # Look for links within the item
                    links = item.find_elements(By.CSS_SELECTOR, 'a[href*="/p/"], a[href*="/c-"]')
                    if links:
                        link_elem = links[0]
                        href = link_elem.get_attribute('href')
                
                if not href:
                    continue
                
                # Extract ID from URL
                note_id = None
                if '/p/' in href:
                    note_id = href.split('/p/')[-1].split('?')[0]
                elif '/c-' in href:
                    note_id = href.split('/c-')[-1].split('?')[0]
                else:
                    continue
                
                # Extract content from the item
                content = item.text.strip()
                
                if not content or len(content) < 10:
                    continue
                
                # Try to find date - look for time elements or date text
                date_text = datetime.now().isoformat()
                try:
                    # Try to find time element first
                    date_elem = item.find_element(By.CSS_SELECTOR, 'time')
                    date_text = date_elem.get_attribute('datetime') or date_elem.get_attribute('title') or date_elem.text
                except:
                    # Fallback: look for common date patterns in text
                    try:
                        # Look for elements with date-like text (e.g., "Nov 24", "5h ago")
                        date_candidates = item.find_elements(By.XPATH, './/*[contains(text(), "h") or contains(text(), "min") or contains(text(), "Nov") or contains(text(), "Dec") or contains(text(), "Jan")]')
                        if date_candidates:
                            date_text = date_candidates[0].text
                    except:
                        pass
                
                # Create note object
                note = {
                    'id': note_id,
                    'content': content[:500],  # Limit content length
                    'date': date_text,
                    'link': href,
                    'author': 'Ryan Tan'
                }
                notes.append(note)
                print(f"  ✓ Scraped item {note_id}")
                    
            except Exception as e:
                print(f"  ⚠️  Error scraping note: {e}")
                continue
        
        print(f"\n✅ Successfully scraped {len(notes)} notes")
        return notes
        
    except Exception as e:
        print(f"❌ Error during scraping: {e}")
        return []
    finally:
        if driver:
            driver.quit()

def save_notes(notes):
    """Save notes to JSON file"""
    # Create assets/data directory if it doesn't exist
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Remove duplicates
    unique_notes = {note['id']: note for note in notes}.values()
    notes_list = list(unique_notes)
    
    # Sort by date
    notes_list.sort(key=lambda x: x.get('date', ''), reverse=True)
    
    # Save to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(notes_list, f, indent=2)
    
    print(f"\n✓ Saved {len(notes_list)} notes to {OUTPUT_FILE}")

if __name__ == '__main__':
    try:
        notes = scrape_notes()
        if notes:
            save_notes(notes)
            print("\n✓ Success! Notes updated.")
        else:
            print("\n✗ No notes found.")
    except Exception as e:
        print(f"\n✗ Error: {e}")
        exit(1)
