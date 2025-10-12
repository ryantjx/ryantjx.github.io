# Ryan's Portfolio Website

A modern, responsive portfolio website built with Jekyll and deployed on GitHub Pages. Features a blog, project showcase, and professional design with dark/light theme support.

## 🚀 Features

- **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- **Blog System**: Integrated blog with pagination and category filtering
- **Project Showcase**: Dynamic project gallery with detailed descriptions
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **GitHub Pages Ready**: Automated deployment workflow

## 🛠️ Technologies

- **Jekyll 3.10.0**: Static site generator compatible with GitHub Pages
- **HTML5 & CSS3**: Modern semantic markup and styling
- **SCSS**: Organized and maintainable stylesheets
- **JavaScript**: Interactive features and theme switching
- **GitHub Actions**: Continuous deployment

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

## 📝 Content Management

### Adding Blog Posts

Create new markdown files in the `_posts` directory following this naming convention:
```
YYYY-MM-DD-post-title.md
```

Include the following frontmatter:
```yaml
---
layout: post
title: "Your Post Title"
date: 2025-01-09 10:00:00 -0500
categories: [category1, category2]
tags: [tag1, tag2]
author: Your Name
excerpt: "Brief description of your post"
---
```

### Adding Projects

Create new markdown files in the `_projects` directory with this frontmatter:
```yaml
---
title: "Project Name"
description: "Brief project description"
technologies: ["Jekyll", "CSS", "JavaScript"]
status: "completed" # or "in-progress", "planned"
date: 2025-01-09
github_url: "https://github.com/username/repo"
demo_url: "https://your-demo-url.com"
image: "/assets/images/projects/project-image.jpg"
featured: true
---
```

### Customization

1. **Site Configuration**: Edit `_config.yml` to update site title, description, social links, and other settings.

2. **Navigation**: Modify the navigation menu in `_config.yml` under the `navigation` section.

3. **Styling**: Customize colors, fonts, and layout in the `_sass` directory.

4. **Content**: Update the about page (`about.md`) and home page (`index.html`) with your information.

## 🚀 Deployment

This site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source
4. Push changes to the `main` branch

The site will automatically build and deploy on every push to the main branch.

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Update the `url` in `_config.yml`

## 📁 Project Structure

```
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _posts/            # Blog posts
├── _projects/         # Project pages
├── _sass/             # Stylesheets
├── assets/            # Images, CSS, JS
├── .github/workflows/ # GitHub Actions
├── _config.yml        # Site configuration
├── Gemfile           # Ruby dependencies
└── index.html        # Homepage
```

## 🎨 Customization Guide

### Colors and Theme

Main colors are defined in `_sass/_base.scss` using CSS custom properties:
- Primary color: `--primary-color`
- Background colors: `--bg-primary`, `--bg-secondary`
- Text colors: `--text-primary`, `--text-secondary`

### Adding New Sections

1. Create new layout files in `_layouts/`
2. Add corresponding SCSS in `_sass/_components.scss`
3. Create content files using the new layout

### Social Links

Update social media links in `_config.yml`:
```yaml
twitter_username: your_twitter
github_username: your_github
linkedin_username: your_linkedin
```

## 🐛 Troubleshooting

### Common Issues

1. **Ruby Version**: Ensure you're using Ruby 3.2+ for compatibility
2. **Gem Conflicts**: Run `bundle update` if you encounter dependency issues
3. **Live Reload Not Working**: Check if port 35729 is available

### Getting Help

- Check the [Jekyll documentation](https://jekyllrb.com/docs/)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in this repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Jekyll and GitHub Pages