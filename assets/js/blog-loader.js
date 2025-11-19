/**
 * Blog Loader
 * Fetches the latest posts from Substack RSS feed and renders them.
 * Uses rss2json.com as a CORS proxy.
 */

const RSS_URL = 'https://ryantjx.substack.com/feed';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok') {
            renderPosts(data.items);
        } else {
            console.error('Failed to fetch blog posts:', data.message);
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
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

document.addEventListener('DOMContentLoaded', fetchPosts);
