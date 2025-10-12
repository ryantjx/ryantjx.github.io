---
layout: post
title: "Building a Modern Jekyll Portfolio Website"
date: 2025-01-09 14:00:00 -0500
categories: [web-development, jekyll]
tags: [jekyll, github-pages, portfolio, web-design]
author: Ryan
excerpt: "A comprehensive guide to creating a professional portfolio website using Jekyll, complete with responsive design, dark mode, and deployment to GitHub Pages."
---

# Building a Modern Jekyll Portfolio Website

Creating a professional portfolio website is crucial for any developer's career. In this post, I'll walk you through the process of building a modern, responsive portfolio website using Jekyll and deploying it to GitHub Pages.

## Why Jekyll?

Jekyll is an excellent choice for portfolio websites because it:

- **Static Site Generation**: Fast, secure, and easy to host
- **GitHub Pages Integration**: Free hosting with automatic deployment
- **Markdown Support**: Write content in familiar markdown syntax
- **Liquid Templating**: Powerful templating system for dynamic content
- **Plugin Ecosystem**: Extensive collection of plugins and themes

## Project Setup

### 1. Environment Configuration

First, ensure you have the proper Ruby environment. On macOS, I recommend using Homebrew:

```bash
# Install Ruby via Homebrew
brew install ruby

# Add to your shell configuration
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/lib/ruby/gems/3.4.0/bin:$PATH"' >> ~/.zshrc

# Install Jekyll and Bundler
gem install jekyll bundler
```

### 2. Creating the Site Structure

A well-organized Jekyll site follows this structure:

```
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _posts/            # Blog posts
├── _projects/         # Portfolio projects
├── _sass/             # Stylesheets
├── assets/            # Static assets
├── _config.yml        # Site configuration
└── Gemfile           # Dependencies
```

## Design Considerations

### Responsive Design

Modern websites must work seamlessly across all devices. I implemented a mobile-first approach using CSS Grid and Flexbox:

```scss
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}
```

### Dark Mode Support

Providing both light and dark themes enhances user experience. Using CSS custom properties makes theme switching elegant:

```scss
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
}
```

### Performance Optimization

- **Lazy Loading**: Images load only when needed
- **Minified Assets**: Compressed CSS and JavaScript
- **Optimized Images**: WebP format with fallbacks
- **Caching Headers**: Proper browser caching configuration

## Key Features Implemented

### 1. Blog System

The blog uses Jekyll's built-in post system with enhancements:

- **Pagination**: Navigate through posts easily
- **Categories and Tags**: Organize content effectively
- **Reading Time**: Estimated reading duration
- **Social Sharing**: Easy sharing on social platforms

### 2. Project Showcase

The portfolio section dynamically displays projects from markdown files:

```yaml
---
title: "Project Name"
description: "Project description"
technologies: ["React", "Node.js", "MongoDB"]
github_url: "https://github.com/username/repo"
demo_url: "https://demo.example.com"
---
```

### 3. Contact Integration

Multiple contact methods ensure visitors can reach out:

- **Email Links**: Direct mailto functionality
- **Social Media**: Links to professional profiles
- **Contact Form**: Optional form integration

## Deployment Strategy

### GitHub Pages Setup

GitHub Pages offers free hosting with these advantages:

- **Automatic Deployment**: Push to deploy
- **Custom Domains**: Use your own domain
- **SSL Certificates**: HTTPS by default
- **Version Control**: Full Git integration

### GitHub Actions Workflow

I created a custom workflow for enhanced control:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      - run: bundle exec jekyll build
```

## SEO and Accessibility

### Search Engine Optimization

- **Meta Tags**: Proper title, description, and Open Graph tags
- **Structured Data**: JSON-LD markup for rich snippets
- **Sitemap**: Automatic sitemap generation
- **RSS Feed**: Subscribe functionality for regular readers

### Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt Text**: Descriptive image alternatives
- **Color Contrast**: WCAG AA compliant color schemes
- **Keyboard Navigation**: Full keyboard accessibility

## Content Strategy

### Writing Engaging Content

Successful portfolio websites combine:

- **Technical Expertise**: Demonstrate your skills
- **Personal Voice**: Show your personality
- **Problem-Solving**: Highlight how you overcome challenges
- **Learning Journey**: Share your growth and experiences

### Regular Updates

Maintain visitor engagement through:

- **Regular Blog Posts**: Share insights and tutorials
- **Project Updates**: Showcase new work
- **Learning Reflections**: Document your development journey

## Performance Metrics

After optimization, the site achieves:

- **Page Speed**: 95+ Lighthouse score
- **SEO Score**: 100 Lighthouse SEO rating
- **Accessibility**: 100 accessibility score
- **Best Practices**: 100 best practices score

## Lessons Learned

### Technical Insights

- **Jekyll Collections**: Powerful for organizing content types
- **Liquid Templating**: Flexible but requires careful planning
- **SCSS Organization**: Modular stylesheets are maintainable
- **GitHub Pages Limitations**: Some plugins aren't supported

### Design Philosophy

- **Simplicity**: Clean design focuses attention on content
- **Consistency**: Unified visual language across all pages
- **User Experience**: Fast loading and intuitive navigation
- **Mobile First**: Ensure excellence on smaller screens

## Next Steps

Future enhancements could include:

- **Content Management**: Integrate headless CMS
- **Analytics**: Detailed visitor tracking
- **Performance**: Further optimization opportunities
- **Functionality**: Advanced features like search

## Conclusion

Building a Jekyll portfolio website provides an excellent platform for showcasing your work while demonstrating technical skills. The combination of modern web technologies, thoughtful design, and strategic content creates a powerful professional presence.

The complete source code is available on [GitHub](https://github.com/ryantjx/ryantjx.github.io), and the live site demonstrates all features discussed in this post.

---

*Have questions about Jekyll or portfolio development? Feel free to reach out via email or connect with me on LinkedIn!*