# Ryan's Portfolio Website

## 🏃 Quick Start

### Prerequisites

- Ruby 3.2 or higher
- Bundler
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ryantjx/ryantjx.github.io.git
   cd ryantjx.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

The site will automatically reload when you make changes to files.

## 🚀 Deployment

This site is deployed on **GitHub Pages** with dynamic content loading.

### How It Works

**Blog Posts**: Fetched dynamically from Substack RSS feed (`https://ryantjx.substack.com/feed`) when you visit the blog page. No build step required!

**Notes**: Currently disabled. To enable:
1. Set `ENABLE_NOTES = true` in `/assets/js/blog-loader.js`
2. Ensure `assets/data/notes.json` exists with valid note data

### Content Updates

- **Posts**: Update automatically when you publish new posts on Substack
- **Notes**: Require manual data file update when enabled

## 📁 Project Structure

- `/assets/js/blog-loader.js` - Frontend JavaScript for fetching and rendering Substack content
- `/blog.html` - Blog page displaying posts and notes
- `/scripts/scrape-notes.py` - Optional Python scraper for Substack notes (not actively used)
- `/.github/workflows/` - GitHub Actions workflows for deployment