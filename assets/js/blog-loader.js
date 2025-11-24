/**
 * Blog Loader
 * Fetches the latest posts and notes from Substack.
 * - Posts: Via RSS feed (rss2json.com proxy)
 * - Notes: From static JSON file (updated via GitHub Actions)
 */

const RSS_URL = 'https://ryantjx.substack.com/feed';
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
const NOTES_URL = '/assets/data/notes.json';

// Feature flag: Enable/disable notes fetching
const ENABLE_NOTES = true; // Set to true when notes.json is available

async function fetchPosts() {
    try {
        const response = await fetch(RSS_API_URL);
        const data = await response.json();

        if (data.status === 'ok') {
            renderPosts(data.items);
        } else {
            console.error('Failed to fetch blog posts:', data.message);
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        const container = document.querySelector('.posts-grid');
        if (container) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Failed to load posts.</p>';
        }
    }
}

async function fetchNotes() {
    const container = document.getElementById('notes-container');
    if (!container) return;

    // If notes are disabled, show a friendly message
    if (!ENABLE_NOTES) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-secondary);">
                <p style="margin-bottom: 1rem;">📝 Notes coming soon!</p>
                <a href="https://substack.com/@ryantjx" target="_blank" style="color: var(--primary-color); text-decoration: none;">
                    View my notes on Substack →
                </a>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(NOTES_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem; color: var(--text-secondary);">
                    <p style="margin-bottom: 1rem;">Unable to load notes</p>
                    <a href="https://substack.com/@ryantjx" target="_blank" style="color: var(--primary-color); text-decoration: none;">
                        View notes on Substack →
                    </a>
                </div>
            `;
        }
    }
}

function renderNotes(notes) {
    const container = document.getElementById('notes-container');
    if (!container) return;

    container.innerHTML = '';

    notes.forEach(note => {
        // Parse date - handle various formats
        let date;
        try {
            date = new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            date = note.date; // Use as-is if parsing fails
        }

        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        // Using a generic avatar or the user's profile image if available
        // For now, using a placeholder or we could hardcode the profile image url if we have it
        const profileImg = 'https://substack-post-media.s3.amazonaws.com/public/images/4046418a-148e-4e73-91dd-c820e4bceefc_2877x2877.jpeg'; // Ryan's profile image from previous curl

        noteCard.innerHTML = `
            <div class="note-header">
                <div class="note-avatar">
                    <img src="${profileImg}" alt="Ryan Tan">
                </div>
                <div class="note-meta">
                    <span class="note-author">Ryan Tan</span>
                    <span class="note-date">${date}</span>
                </div>
            </div>
            <div class="note-content">
                <p>${note.content}</p>
            </div>
            ${note.link ? `<a href="${note.link}" target="_blank" style="display: block; margin-top: 0.75rem; font-size: 0.85rem; color: var(--primary-color); text-decoration: none;">View on Substack &rarr;</a>` : ''}
        `;

        container.appendChild(noteCard);
    });
}

function renderPosts(posts) {
    const container = document.querySelector('.posts-grid');
    if (!container) return;

    container.innerHTML = '';

    posts.forEach(post => {
        // Extract first image from content
        const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
        const imgSrc = imgMatch ? imgMatch[1] : null;

        // Strip HTML for description
        const description = stripHtml(post.description).substring(0, 120) + '...';

        const date = new Date(post.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const card = document.createElement('div');
        card.className = 'post-embed-container';

        let imageHtml = '';
        if (imgSrc) {
            imageHtml = `<div class="post-image" style="background-image: url('${imgSrc}')"></div>`;
        } else {
            // Fallback placeholder or pattern
            imageHtml = `<div class="post-image placeholder"></div>`;
        }

        card.innerHTML = `
            <div class="substack-post-embed custom-dynamic-card">
                ${imageHtml}
                <div class="post-content">
                    <p class="post-title"><strong>${post.title}</strong></p>
                    <p class="post-meta">${date}</p>
                    <p class="post-description">${description}</p>
                    <a href="${post.link}" target="_blank" class="read-more">Read on Substack</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
    fetchNotes();
});
