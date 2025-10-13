// Theme toggle functionality
(function() {
  'use strict';
  
  // Theme management
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeSwitch = document.getElementById('theme-switch');
  const themeSwitchContainer = document.querySelector('.theme-switch');
  const html = document.documentElement;
  
  // Get stored theme or default to system preference
  function getStoredTheme() {
    return localStorage.getItem('theme');
  }
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function getCurrentTheme() {
    return getStoredTheme() || getSystemTheme();
  }
  
  // Apply theme
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    localStorage.setItem('theme', theme);
  }
  
  // Update theme icon
  function updateThemeIcon(theme) {
    if (themeIcon) {
      // Update FontAwesome icon classes
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      // Update aria-pressed
      themeIcon.setAttribute('aria-hidden', 'true');
    }

    // Update switch visual state if present
    if (themeSwitch) {
      if (theme === 'dark') {
        themeSwitch.classList.add('on');
        themeSwitch.setAttribute('data-state', 'dark');
      } else {
        themeSwitch.classList.remove('on');
        themeSwitch.setAttribute('data-state', 'light');
      }
    }
    if (themeSwitchContainer) {
      themeSwitchContainer.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }
  
  // Initialize theme
  function initTheme() {
    const theme = getCurrentTheme();
    applyTheme(theme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  // Event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });
  }

  // Mobile switch click
  if (themeSwitchContainer) {
    themeSwitchContainer.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });

    // Allow keyboard activation
    themeSwitchContainer.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', initTheme);
  
  // Mobile navigation toggle - JavaScript-based approach
  const navTrigger = document.getElementById('nav-trigger');
  const menuIcon = document.querySelector('.menu-icon');
  const trigger = document.querySelector('.trigger');
  let isMenuOpen = false;
  
  console.log('Mobile Navigation Debug:');
  console.log('navTrigger:', !!navTrigger);
  console.log('menuIcon:', !!menuIcon);
  console.log('trigger:', !!trigger);
  
  if (menuIcon && trigger) {
    // Toggle menu function
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      console.log('Toggling menu. New state:', isMenuOpen);
      
      if (isMenuOpen) {
        trigger.classList.add('menu-open');
        menuIcon.classList.add('menu-open');
        if (navTrigger) navTrigger.checked = true;
      } else {
        trigger.classList.remove('menu-open');
        menuIcon.classList.remove('menu-open');
        if (navTrigger) navTrigger.checked = false;
      }
      
      // Update ARIA attributes
      menuIcon.setAttribute('aria-expanded', isMenuOpen.toString());
    }
    
    // Add click event to menu icon
    menuIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Menu icon clicked!');
      toggleMenu();
    });
    
    // Handle keyboard navigation for menu icon
    menuIcon.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        console.log('Keyboard trigger activated');
        toggleMenu();
      }
    });
    
    // Also listen to checkbox changes (fallback)
    if (navTrigger) {
      navTrigger.addEventListener('change', function() {
        console.log('Checkbox changed to:', navTrigger.checked);
        isMenuOpen = navTrigger.checked;
        
        if (isMenuOpen) {
          trigger.classList.add('menu-open');
          menuIcon.classList.add('menu-open');
        } else {
          trigger.classList.remove('menu-open');
          menuIcon.classList.remove('menu-open');
        }
        
        menuIcon.setAttribute('aria-expanded', isMenuOpen.toString());
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && 
          !menuIcon.contains(e.target) && 
          !trigger.contains(e.target)) {
        console.log('Clicking outside, closing menu');
        isMenuOpen = false;
        trigger.classList.remove('menu-open');
        menuIcon.classList.remove('menu-open');
        if (navTrigger) navTrigger.checked = false;
        menuIcon.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.trigger .page-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        console.log('Nav link clicked, closing menu');
        isMenuOpen = false;
        trigger.classList.remove('menu-open');
        menuIcon.classList.remove('menu-open');
        if (navTrigger) navTrigger.checked = false;
        menuIcon.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        console.log('Escape key pressed, closing menu');
        isMenuOpen = false;
        trigger.classList.remove('menu-open');
        menuIcon.classList.remove('menu-open');
        if (navTrigger) navTrigger.checked = false;
        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.focus();
      }
    });
    
    // Initialize accessibility attributes
    menuIcon.setAttribute('aria-expanded', 'false');
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Back to top button (if needed)
  function addBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add back to top functionality if page is long enough
  if (document.body.scrollHeight > window.innerHeight * 2) {
    addBackToTop();
  }
  
  // Simple reading progress indicator for blog posts
  function addReadingProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const articleHeight = article.offsetHeight;
      const articleTop = article.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      
      const progress = Math.max(0, Math.min(100, 
        ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
      ));
      
      progressBar.style.width = progress + '%';
    });
  }
  
  // Add reading progress for blog posts
  if (document.querySelector('.post')) {
    addReadingProgress();
  }
  
  // Copy code blocks functionality
  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
      const pre = codeBlock.parentElement;
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-btn';
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
      copyButton.setAttribute('aria-label', 'Copy code');
      
      pre.style.position = 'relative';
      pre.appendChild(copyButton);
      
      copyButton.addEventListener('click', function() {
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(function() {
          copyButton.innerHTML = '<i class="fas fa-check"></i>';
          copyButton.classList.add('copied');
          
          setTimeout(function() {
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.classList.remove('copied');
          }, 2000);
        }).catch(function() {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          
          copyButton.innerHTML = '<i class="fas fa-check"></i>';
          copyButton.classList.add('copied');
          
          setTimeout(function() {
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }
  
  // Initialize copy buttons
  document.addEventListener('DOMContentLoaded', addCopyButtons);
  
  // Image lazy loading (if needed)
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      images.forEach(function(img) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }
  
  // Initialize lazy loading
  document.addEventListener('DOMContentLoaded', lazyLoadImages);
  
  // GitHub Statistics
  async function fetchGitHubStats() {
    try {
      // Get GitHub username from data attribute on <body>
      const username = document.body.dataset.githubUsername;
      if (!username) throw new Error('GitHub username not configured. Please set data-github-username attribute on <body>.');
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      
      // Fetch repositories data
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories data');
      const reposData = await reposResponse.json();
      
      // Calculate statistics
      const stats = {
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars: reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        totalForks: reposData.reduce((sum, repo) => sum + repo.forks_count, 0),
        totalCommits: 'N/A' // GitHub API doesn't provide total commits easily
      };
      
      // Try to get commit count from contribution API (this is a rough estimate)
      try {
        const contributionsResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (contributionsResponse.ok) {
          const contributionsData = await contributionsResponse.json();
          if (contributionsData.total && contributionsData.total.lastYear) {
            stats.totalCommits = contributionsData.total.lastYear;
          }
        }
      } catch (error) {
        console.log('Could not fetch contributions data:', error);
      }
      
      // Update DOM elements
      updateStatElement('total-commits', stats.totalCommits);
      updateStatElement('public-repos', stats.publicRepos);
      updateStatElement('total-stars', stats.totalStars);
      updateStatElement('total-forks', stats.totalForks);
      updateStatElement('followers', stats.followers);
      updateStatElement('following', stats.following);
      
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      
      // Show error state
      const statElements = ['total-commits', 'public-repos', 'total-stars', 'total-forks', 'followers', 'following'];
      statElements.forEach(id => {
        updateStatElement(id, 'Error');
      });
    }
  }
  
  function updateStatElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      // Add animation
      element.style.opacity = '0';
      setTimeout(() => {
        element.textContent = typeof value === 'number' ? value.toLocaleString() : value;
        element.style.opacity = '1';
      }, 100);
    }
  }
  
  // Initialize GitHub stats on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Only fetch stats if we're on a page with GitHub stats elements
    if (document.querySelector('.github-stats')) {
      fetchGitHubStats();
    }
  });
  
})();

// About Page Functionality
function initializeAboutPage() {
  'use strict';
  
  // Animate hero stats counter
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCount = (element, target) => {
      let current = 0;
      const increment = target / 50; // Animation duration control
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.ceil(current);
        }
      }, 30);
    };
    
    // Use Intersection Observer to trigger animation when visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.textContent === '0') {
            const target = parseInt(entry.target.dataset.count);
            animateCount(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      statNumbers.forEach(stat => observer.observe(stat));
    } else {
      // Fallback for older browsers
      statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        animateCount(stat, target);
      });
    }
  }
  
  // Profile gallery functionality
  function initProfileGallery() {
    const mainPhoto = document.querySelector('.profile-photo');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    
    if (!mainPhoto || !galleryThumbs.length) return;
    
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.main;
        if (newSrc && newSrc !== mainPhoto.src) {
          // Add fade effect
          mainPhoto.style.opacity = '0.5';
          setTimeout(() => {
            mainPhoto.src = newSrc;
            mainPhoto.style.opacity = '1';
          }, 200);
          
          // Update active thumbnail
          galleryThumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });
  }
  
  // Experience timeline functionality
  function initExperienceTimeline() {
    const timeline = document.getElementById('experience-timeline');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    if (!timeline) return;
    
    let experiences = [];
    let currentFilter = 'all';
    
    // Load experiences data (simulating API call with Jekyll data)
    async function loadExperiences() {
      try {
        // In a real Jekyll site, this data would be available via Liquid templating
        // For now, we'll simulate the data structure
        const response = await fetch('/assets/data/experiences.json').catch(() => {
          // Fallback: simulate data if JSON file doesn't exist
          return { ok: false };
        });
        
        if (response.ok) {
          const data = await response.json();
          experiences = [
            ...(data.education || []),
            ...(data.professional || []),
            ...(data.projects || [])
          ];
        } else {
          // Fallback data for demonstration
          experiences = [
            {
              title: "MSc Statistics",
              organization: "University of Warwick",
              location: "Coventry, UK",
              period: "2023 - 2024",
              type: "education",
              category: "Master's Degree",
              description: "Advanced statistical methods, machine learning, and data analysis.",
              highlights: ["Statistical Machine Learning", "Bayesian Statistics", "Time Series Analysis"],
              image: "/assets/images/experiences/warwick-graduation.jpg",
              featured: true
            },
            {
              title: "Full Stack Developer",
              organization: "Tech Startup",
              location: "London, UK",
              period: "2024 - Present",
              type: "professional",
              category: "Full-time",
              description: "Leading full-stack development initiatives, building scalable web applications.",
              highlights: ["Built responsive web applications", "Implemented RESTful APIs", "Mentored junior developers"],
              technologies: ["JavaScript", "React", "Node.js", "PostgreSQL"],
              image: "/assets/images/experiences/current-job.jpg",
              featured: true
            },
            {
              title: "Personal Portfolio Website",
              organization: "Personal Project",
              location: "Remote",
              period: "2024",
              type: "projects",
              category: "Web Development",
              description: "Built a modern, responsive portfolio website using Jekyll.",
              highlights: ["Responsive design", "Dynamic content loading", "Performance optimization"],
              technologies: ["Jekyll", "SCSS", "JavaScript"],
              link: "https://ryantjx.github.io",
              github: "https://github.com/ryantjx/ryantjx.github.io",
              image: "/assets/images/experiences/portfolio-project.jpg",
              featured: true
            }
          ];
        }
        
        renderExperiences();
        
      } catch (error) {
        console.error('Error loading experiences:', error);
        showError();
      }
    }
    
    // Render experiences
    function renderExperiences() {
      const filteredExperiences = currentFilter === 'all' 
        ? experiences 
        : experiences.filter(exp => exp.type === currentFilter);
      
      // Sort by featured first, then by date
      filteredExperiences.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.period.split(' - ')[0]) - new Date(a.period.split(' - ')[0]);
      });
      
      const html = filteredExperiences.map(exp => createExperienceCard(exp)).join('');
      
      // Remove loading spinner
      if (loadingSpinner) {
        loadingSpinner.remove();
      }
      
      timeline.innerHTML = html;
      
      // Animate cards in
      setTimeout(() => {
        const cards = timeline.querySelectorAll('.experience-item');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, index * 100);
        });
      }, 100);
    }
    
    // Create experience card HTML
    function createExperienceCard(exp) {
      return `
        <div class="experience-item ${exp.featured ? 'featured' : ''}" data-type="${exp.type}">
          <div class="experience-image">
            <img src="${exp.image}" alt="${exp.title}" onerror="this.parentElement.innerHTML='📸 Image not available';">
          </div>
          <div class="experience-content">
            <div class="experience-header">
              <h3 class="experience-title">${exp.title}</h3>
              <div class="experience-org">${exp.organization}</div>
              <div class="experience-meta">
                <span class="experience-period">${exp.period}</span>
                <span class="experience-location">${exp.location}</span>
              </div>
              <div class="experience-category">${exp.category}</div>
            </div>
            
            <p class="experience-description">${exp.description}</p>
            
            ${exp.highlights ? `
              <div class="experience-highlights">
                <ul>
                  ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${exp.technologies ? `
              <div class="experience-tech">
                ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            ` : ''}
            
            ${exp.link || exp.github ? `
              <div class="experience-links">
                ${exp.link ? `<a href="${exp.link}" target="_blank"><i class="fas fa-external-link-alt"></i>View Live</a>` : ''}
                ${exp.github ? `<a href="${exp.github}" target="_blank"><i class="fab fa-github"></i>View Code</a>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    
    // Show error state
    function showError() {
      if (loadingSpinner) {
        loadingSpinner.innerHTML = `
          <div class="error-state">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem;"></i>
            <p>Unable to load experiences. Please try again later.</p>
          </div>
        `;
      }
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.dataset.filter;
        renderExperiences();
      });
    });
    
    // Initialize
    loadExperiences();
  }
  
  // Initialize all about page functionality
  function init() {
    animateStats();
    initProfileGallery();
    initExperienceTimeline();
  }
  
  // Check if we're on the about page
  if (document.querySelector('.about-hero') || document.querySelector('.experience-timeline')) {
    init();
  }
}

// Export for global access
window.initializeAboutPage = initializeAboutPage;