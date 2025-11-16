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

// Trading Instruments Table Functionality
(function() {
  'use strict';
  
  // Define trading instruments with their trading hours (in ET)
  const instruments = [
    {
      symbol: 'SPX',
      name: 'S&P 500 Index',
      exchange: 'CBOE',
      regularOpen: '09:30',
      regularClose: '16:00',
      preMarketOpen: '04:00',
      afterHoursClose: '20:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5] // Monday-Friday
    },
    {
      symbol: 'VIX',
      name: 'CBOE Volatility Index',
      exchange: 'CBOE',
      regularOpen: '09:30',
      regularClose: '16:15',
      preMarketOpen: '03:00',
      afterHoursClose: '16:15',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'QQQ',
      name: 'Invesco QQQ Trust',
      exchange: 'NASDAQ',
      regularOpen: '09:30',
      regularClose: '16:00',
      preMarketOpen: '04:00',
      afterHoursClose: '20:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'NDX',
      name: 'NASDAQ-100 Index',
      exchange: 'NASDAQ',
      regularOpen: '09:30',
      regularClose: '16:00',
      preMarketOpen: '04:00',
      afterHoursClose: '20:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'RUSS',
      name: 'Russell 2000 Index',
      exchange: 'Russell',
      regularOpen: '09:30',
      regularClose: '16:00',
      preMarketOpen: '04:00',
      afterHoursClose: '20:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'ES',
      name: 'E-mini S&P 500 Futures',
      exchange: 'CME',
      regularOpen: '18:00', // Sunday 6:00 PM ET
      regularClose: '17:00', // Friday 5:00 PM ET
      preMarketOpen: null,
      afterHoursClose: null,
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5], // Sunday 6pm - Friday 5pm
      nearly24h: true,
      dailyBreak: { start: '17:00', end: '18:00' } // Daily maintenance 5-6pm ET
    },
    {
      symbol: 'NQ',
      name: 'E-mini NASDAQ Futures',
      exchange: 'CME',
      regularOpen: '18:00', // Sunday 6:00 PM ET
      regularClose: '17:00', // Friday 5:00 PM ET
      preMarketOpen: null,
      afterHoursClose: null,
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5], // Sunday 6pm - Friday 5pm
      nearly24h: true,
      dailyBreak: { start: '17:00', end: '18:00' } // Daily maintenance 5-6pm ET
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      exchange: 'Crypto',
      regularOpen: null,
      regularClose: null,
      preMarketOpen: null,
      afterHoursClose: null,
      timezone: 'UTC',
      tradingDays: [0, 1, 2, 3, 4, 5, 6], // 24/7
      is24h: true
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      exchange: 'Crypto',
      regularOpen: null,
      regularClose: null,
      preMarketOpen: null,
      afterHoursClose: null,
      timezone: 'UTC',
      tradingDays: [0, 1, 2, 3, 4, 5, 6], // 24/7
      is24h: true
    },
    {
      symbol: 'DAX',
      name: 'DAX Index',
      exchange: 'XETRA',
      regularOpen: '09:00',
      regularClose: '17:30',
      preMarketOpen: '08:00',
      afterHoursClose: '22:00',
      timezone: 'Europe/Berlin',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'STOXX',
      name: 'Euro Stoxx 50',
      exchange: 'Eurex',
      regularOpen: '09:00',
      regularClose: '17:30',
      preMarketOpen: '08:00',
      afterHoursClose: '22:00',
      timezone: 'Europe/Berlin',
      tradingDays: [1, 2, 3, 4, 5]
    },
    {
      symbol: 'HSI',
      name: 'Hang Seng Index',
      exchange: 'HKEX',
      regularOpen: '09:30',
      regularClose: '16:00',
      preMarketOpen: '09:15',
      afterHoursClose: '16:00',
      timezone: 'Asia/Hong_Kong',
      tradingDays: [1, 2, 3, 4, 5],
      lunchBreak: { start: '12:00', end: '13:00' }
    },
    {
      symbol: 'NKY',
      name: 'Nikkei 225',
      exchange: 'TSE',
      regularOpen: '09:00',
      regularClose: '15:00',
      preMarketOpen: '08:00',
      afterHoursClose: '15:00',
      timezone: 'Asia/Tokyo',
      tradingDays: [1, 2, 3, 4, 5],
      lunchBreak: { start: '11:30', end: '12:30' }
    },
    {
      symbol: 'DXY',
      name: 'US Dollar Index',
      exchange: 'ICE',
      regularOpen: '18:00', // Sunday evening
      regularClose: '17:00', // Friday afternoon
      preMarketOpen: null,
      afterHoursClose: null,
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5],
      nearly24h: true
    }
  ];
  
  function parseTime(timeStr, timezone) {
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create date in the instrument's timezone
    const dateStr = now.toLocaleString('en-US', { timeZone: timezone });
    const date = new Date(dateStr);
    date.setHours(hours, minutes, 0, 0);
    
    return date;
  }
  
  function getTradingStatus(instrument) {
    const now = new Date();
    const nowInTZ = new Date(now.toLocaleString('en-US', { timeZone: instrument.timezone }));
    const currentDay = nowInTZ.getDay();
    const currentTime = nowInTZ.getHours() * 60 + nowInTZ.getMinutes();
    
    // Check if it's a trading day
    if (!instrument.tradingDays.includes(currentDay)) {
      return {
        status: 'closed',
        isOpen: false,
        countdown: getNextTradingDayCountdown(instrument, nowInTZ)
      };
    }
    
    // 24/7 markets
    if (instrument.is24h) {
      return {
        status: 'open',
        isOpen: true,
        countdown: null
      };
    }
    
    // Nearly 24h markets (futures)
    if (instrument.nearly24h) {
      const closeTime = parseTimeInMinutes(instrument.regularClose);
      const openTime = parseTimeInMinutes(instrument.regularOpen);
      
      // For futures: close Friday 5pm, reopen Sunday 6pm ET
      // Friday after 5pm - CLOSED until Sunday 6pm
      if (currentDay === 5 && currentTime >= closeTime) {
        return {
          status: 'closed',
          isOpen: false,
          countdown: getCountdownToTime(instrument, 'regularOpen', nowInTZ, 2) // Sunday
        };
      }
      
      // Saturday all day - CLOSED
      if (currentDay === 6) {
        return {
          status: 'closed',
          isOpen: false,
          countdown: getCountdownToTime(instrument, 'regularOpen', nowInTZ, 1) // Sunday
        };
      }
      
      // Sunday before 6pm - CLOSED
      if (currentDay === 0 && currentTime < openTime) {
        return {
          status: 'closed',
          isOpen: false,
          countdown: getCountdownToTime(instrument, 'regularOpen', nowInTZ, 0)
        };
      }
      
      // Check for daily break (5pm-6pm ET)
      if (instrument.dailyBreak) {
        const breakStart = parseTimeInMinutes(instrument.dailyBreak.start);
        const breakEnd = parseTimeInMinutes(instrument.dailyBreak.end);
        
        if (currentTime >= breakStart && currentTime < breakEnd) {
          return {
            status: 'closed',
            isOpen: false,
            countdown: getCountdownToTime(instrument, 'dailyBreak.end', nowInTZ)
          };
        }
      }
      
      return {
        status: 'open',
        isOpen: true,
        countdown: getCountdownToTime(instrument, 'regularClose', nowInTZ, 5) // Friday close
      };
    }
    
    // Regular markets with defined hours
    const regularOpenTime = parseTimeInMinutes(instrument.regularOpen);
    const regularCloseTime = parseTimeInMinutes(instrument.regularClose);
    
    // Check for lunch break (Asian markets)
    if (instrument.lunchBreak) {
      const lunchStart = parseTimeInMinutes(instrument.lunchBreak.start);
      const lunchEnd = parseTimeInMinutes(instrument.lunchBreak.end);
      
      if (currentTime >= lunchStart && currentTime < lunchEnd) {
        return {
          status: 'closed',
          isOpen: false,
          countdown: getCountdownToTime(instrument, 'lunchBreak.end', nowInTZ)
        };
      }
    }
    
    if (currentTime >= regularOpenTime && currentTime < regularCloseTime) {
      return {
        status: 'open',
        isOpen: true,
        countdown: getCountdownToTime(instrument, 'regularClose', nowInTZ)
      };
    }
    
    // Market closed - show countdown to next open
    if (currentTime < regularOpenTime) {
      return {
        status: 'closed',
        isOpen: false,
        countdown: getCountdownToTime(instrument, 'regularOpen', nowInTZ)
      };
    }
    
    // After hours closed - show countdown to next day
    return {
      status: 'closed',
      isOpen: false,
      countdown: getCountdownToTime(instrument, 'regularOpen', nowInTZ, 1)
    };
  }
  
  function parseTimeInMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function getTimezoneAbbr(timezone) {
    const abbrs = {
      'America/New_York': 'ET',
      'America/Chicago': 'CT',
      'Europe/Berlin': 'CET',
      'Asia/Hong_Kong': 'HKT',
      'Asia/Tokyo': 'JST',
      'UTC': 'UTC'
    };
    return abbrs[timezone] || '';
  }
  
  function getNextTradingDayCountdown(instrument, currentDate) {
    let nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    while (!instrument.tradingDays.includes(nextDay.getDay())) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    
    const time = instrument.regularOpen;
    const [hours, minutes] = time.split(':').map(Number);
    nextDay.setHours(hours, minutes, 0, 0);
    
    return formatCountdown(nextDay - new Date());
  }
  
  function getCountdownToTime(instrument, timeField, currentDate, daysOffset = 0) {
    const targetDate = new Date(currentDate);
    
    // Handle special case for futures closing on Friday
    if (daysOffset === 5 && instrument.nearly24h) {
      // Find next Friday
      let daysUntilFriday = (5 - currentDate.getDay() + 7) % 7;
      if (daysUntilFriday === 0 && currentDate.getHours() * 60 + currentDate.getMinutes() >= parseTimeInMinutes(instrument.regularClose)) {
        daysUntilFriday = 7;
      }
      targetDate.setDate(targetDate.getDate() + daysUntilFriday);
    } else if (daysOffset === 0 && instrument.nearly24h && currentDate.getDay() === 6) {
      // If Saturday, next open is Sunday
      targetDate.setDate(targetDate.getDate() + 1);
    } else {
      targetDate.setDate(targetDate.getDate() + daysOffset);
    }
    
    let timeStr;
    if (timeField === 'lunchBreak.end') {
      timeStr = instrument.lunchBreak.end;
    } else if (timeField === 'dailyBreak.end') {
      timeStr = instrument.dailyBreak.end;
    } else {
      timeStr = instrument[timeField];
    }
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const localNow = new Date(now.toLocaleString('en-US', { timeZone: instrument.timezone }));
    const diff = targetDate - localNow;
    
    if (diff <= 0) return null;
    
    return formatCountdown(diff);
  }
  
  function formatCountdown(milliseconds) {
    if (milliseconds <= 0) return null;
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h ${minutes}m`;
    }
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  // Yahoo Finance symbol mapping and futures contract management
  const yahooSymbolMap = {
    'SPX': '^GSPC',      // S&P 500 Index
    'VIX': '^VIX',       // CBOE Volatility Index
    'QQQ': 'QQQ',        // Invesco QQQ Trust
    'NDX': '^NDX',       // NASDAQ-100 Index
    'RUSS': '^RUT',      // Russell 2000 Index
    'ES': 'ES=F',        // E-mini S&P 500 Futures (will be replaced with current contract)
    'NQ': 'NQ=F',        // E-mini NASDAQ-100 Futures
    'DAX': '^GDAXI',     // DAX Performance Index
    'STOXX': '^STOXX50E', // EURO STOXX 50
    'HSI': '^HSI',       // Hang Seng Index
    'NKY': '^N225',      // Nikkei 225
    'DXY': 'DX-Y.NYB'    // US Dollar Index
  };
  
  // CoinGecko API mapping for cryptocurrencies
  const coinGeckoMap = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum'
  };
  
  // Currency symbols for each instrument
  const currencySymbols = {
    'SPX': 'USD ',
    'VIX': '',      // VIX is a percentage index
    'QQQ': 'USD ',
    'NDX': 'USD ',
    'RUSS': 'USD ',
    'ES': 'USD ',
    'NQ': 'USD ',
    'BTC': 'USD ',
    'ETH': 'USD ',
    'DAX': '€',
    'STOXX': '€',
    'HSI': 'HK$',
    'NKY': '¥',
    'DXY': ''
  };
  
  // Country flags for each instrument
  const countryFlags = {
    'SPX': '🇺🇸',
    'VIX': '🇺🇸',
    'QQQ': '🇺🇸',
    'NDX': '🇺🇸',
    'RUSS': '🇺🇸',
    'ES': '🇺🇸',
    'NQ': '🇺🇸',
    'BTC': '🌐',
    'ETH': '🌐',
    'DAX': '🇩🇪',
    'STOXX': '🇪🇺',
    'HSI': '🇭🇰',
    'NKY': '🇯🇵',
    'DXY': '🇺🇸'
  };
  
  // Sector/Category for each instrument
  const instrumentSectors = {
    'SPX': 'Index',
    'VIX': 'Volatility',
    'QQQ': 'ETF',
    'NDX': 'Index',
    'RUSS': 'Index',
    'ES': 'Futures',
    'NQ': 'Futures',
    'BTC': 'Crypto',
    'ETH': 'Crypto',
    'DAX': 'Index',
    'STOXX': 'Index',
    'HSI': 'Index',
    'NKY': 'Index',
    'DXY': 'Currency'
  };
  
  // Futures contract months (CME codes)
  const futuresMonths = ['H', 'M', 'U', 'Z']; // Mar, Jun, Sep, Dec
  const monthCodes = {
    'H': 2,  // March (month 3 - 1 for 0-indexed)
    'M': 5,  // June
    'U': 8,  // September
    'Z': 11  // December
  };
  
  // Get current front-month futures contract with 1-week rollover
  function getFuturesContract(baseSymbol, rollDaysBefore = 7) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Find next contract month
    let nextContractMonthIndex = futuresMonths.findIndex(code => monthCodes[code] >= currentMonth);
    if (nextContractMonthIndex === -1) {
      nextContractMonthIndex = 0; // Roll to next year's first contract
    }
    
    const nextMonthCode = futuresMonths[nextContractMonthIndex];
    const nextContractMonth = monthCodes[nextMonthCode];
    let contractYear = currentYear;
    
    // If we've passed all contracts this year, use next year
    if (nextContractMonth < currentMonth) {
      contractYear++;
    }
    
    // Calculate expiry (3rd Friday of contract month)
    const expiryDate = getThirdFriday(contractYear, nextContractMonth);
    
    // Check if we're within rollover window (1 week before expiry)
    const daysUntilExpiry = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));
    
    let contractMonthCode, contractYearCode;
    
    if (daysUntilExpiry <= rollDaysBefore) {
      // Roll to next contract
      const nextIndex = (nextContractMonthIndex + 1) % futuresMonths.length;
      contractMonthCode = futuresMonths[nextIndex];
      contractYearCode = (nextIndex === 0 ? contractYear + 1 : contractYear) % 100;
    } else {
      contractMonthCode = nextMonthCode;
      contractYearCode = contractYear % 100;
    }
    
    // Format: ESH25 (E-mini S&P 500 March 2025)
    return `${baseSymbol}${contractMonthCode}${String(contractYearCode).padStart(2, '0')}`;
  }
  
  // Get third Friday of a month (futures expiry)
  function getThirdFriday(year, month) {
    const firstDay = new Date(year, month, 1);
    const firstFriday = 1 + (5 - firstDay.getDay() + 7) % 7;
    const thirdFriday = firstDay.getDay() <= 5 ? firstFriday + 14 : firstFriday + 7;
    return new Date(year, month, thirdFriday);
  }
  
  // Price cache to avoid excessive API calls
  const priceCache = {
    data: {},
    lastFetch: 0,
    cacheDuration: 60000 // Cache for 1 minute
  };
  
  // Fetch cryptocurrency prices from CoinGecko
  async function fetchCryptoPrices() {
    const cryptoIds = Object.values(coinGeckoMap).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`;
    
    try {
      console.log('Fetching crypto prices from CoinGecko...');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const prices = {};
      
      // Map CoinGecko data back to our symbols
      Object.entries(coinGeckoMap).forEach(([key, coinId]) => {
        if (data[coinId]) {
          prices[key] = {
            price: data[coinId].usd,
            symbol: coinId
          };
          console.log(`✓ ${key}: $${data[coinId].usd.toFixed(2)}`);
        } else {
          prices[key] = null;
          console.warn(`${key}: Missing price data`);
        }
      });
      
      return prices;
    } catch (error) {
      console.error('Error fetching CoinGecko data:', error);
      // Return null for all crypto symbols
      const prices = {};
      Object.keys(coinGeckoMap).forEach(key => {
        prices[key] = null;
      });
      return prices;
    }
  }
  
  // Fetch prices from Yahoo Finance and CoinGecko
  async function fetchYahooPrices() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (now - priceCache.lastFetch < priceCache.cacheDuration && Object.keys(priceCache.data).length > 0) {
      console.log('Using cached price data');
      return priceCache.data;
    }
    
    console.log('Fetching fresh price data...');
    const prices = {};
    
    try {
      // Update futures contracts with current front-month
      const esContract = getFuturesContract('ES');
      const nqContract = getFuturesContract('NQ');
      
      console.log('Current futures contracts:', { ES: esContract, NQ: nqContract });
      
      // Create symbols list with updated futures
      const symbolsToFetch = { ...yahooSymbolMap };
      symbolsToFetch['ES'] = esContract;
      symbolsToFetch['NQ'] = nqContract;
      
      // Fetch Yahoo Finance prices
      const yahooPromises = Object.entries(symbolsToFetch).map(async ([key, yahooSymbol]) => {
        try {
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`;
          console.log(`Fetching ${key} (${yahooSymbol})...`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.chart && data.chart.result && data.chart.result[0]) {
            const result = data.chart.result[0];
            const meta = result.meta;
            
            const currentPrice = meta.regularMarketPrice || meta.previousClose;
            const previousClose = meta.chartPreviousClose || meta.previousClose;
            
            if (currentPrice && previousClose) {
              prices[key] = {
                price: currentPrice,
                symbol: yahooSymbol
              };
              console.log(`✓ ${key}: $${currentPrice.toFixed(2)}`);
            } else {
              console.warn(`${key}: Missing price data`);
              prices[key] = null;
            }
          } else {
            console.warn(`${key}: Invalid response structure`);
            prices[key] = null;
          }
        } catch (error) {
          console.warn(`Failed to fetch ${key} (${yahooSymbol}):`, error.message);
          prices[key] = null;
        }
      });
      
      // Fetch crypto prices from CoinGecko
      const cryptoPromise = fetchCryptoPrices();
      
      // Wait for all fetches to complete
      await Promise.all(yahooPromises);
      const cryptoPrices = await cryptoPromise;
      
      // Merge crypto prices into main prices object
      Object.assign(prices, cryptoPrices);
      
      console.log(`Successfully fetched data for ${Object.keys(prices).length} instruments`);
      
      // Update cache
      priceCache.data = prices;
      priceCache.lastFetch = now;
      
      return prices;
      
    } catch (error) {
      console.error('Error fetching price data:', error);
      // Return cached data or empty object
      if (Object.keys(priceCache.data).length > 0) {
        console.log('Using cached data due to error');
        return priceCache.data;
      } else {
        console.log('No cached data available');
        return prices;
      }
    }
  }
  
  // Get price display with live data
  function getPriceDisplay(symbol) {
    const priceData = priceCache.data[symbol];
    
    // If null, data fetch failed
    if (priceData === null) {
      return '<span style="color: #999;">No data</span>';
    }
    
    // If undefined, still loading
    if (!priceData) {
      return '<span style="color: #999;">Loading...</span>';
    }
    
    const currency = currencySymbols[symbol] || '';
    
    // Format price based on value
    const decimals = priceData.price < 10 ? 4 : priceData.price < 1000 ? 2 : 2;
    const formattedPrice = priceData.price.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
    
    return `${currency}${formattedPrice}`;
  }
  
  // Get last updated time
  function getLastUpdated() {
    if (priceCache.lastFetch === 0) {
      return 'Never';
    }
    
    const now = Date.now();
    const secondsAgo = Math.floor((now - priceCache.lastFetch) / 1000);
    
    if (secondsAgo < 60) {
      return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(secondsAgo / 3600);
      return `${hours}h ago`;
    }
  }
  
  function getCountdown(instrument, timeField, currentDate, daysOffset = 0) {
    return getCountdownToTime(instrument, timeField, currentDate, daysOffset);
  }
  
  function getNextTradingDay(instrument, currentDate) {
    return getNextTradingDayCountdown(instrument, currentDate);
  }
  
  function renderTradingTable() {
    const tableBody = document.getElementById('trading-table-body');
    if (!tableBody) {
      console.warn('Table body element not found');
      return;
    }
    
    const rows = instruments.map(instrument => {
      const status = getTradingStatus(instrument);
      const statusIcon = status.isOpen ? '🟢' : '🔴';
      const priceDisplay = getPriceDisplay(instrument.symbol);
      const countdownText = status.countdown || (status.isOpen ? '—' : 'N/A');
      const countryFlag = countryFlags[instrument.symbol] || '';
      const sector = instrumentSectors[instrument.symbol] || 'Other';
      
      return `
        <tr class="instrument-row status-${status.status}">
          <td class="instrument-symbol"><span class="country-flag">${countryFlag}</span> <strong>${instrument.symbol}</strong></td>
          <td class="instrument-name">${instrument.name}</td>
          <td class="instrument-sector">${sector}</td>
          <td class="instrument-price">${priceDisplay}</td>
          <td class="instrument-status">
            <span class="status-badge status-${status.status}">
              ${statusIcon}
            </span>
          </td>
          <td class="instrument-countdown">
            ${countdownText !== '—' && countdownText !== 'N/A' ? `<span class="countdown-timer">${countdownText}</span>` : countdownText}
          </td>
        </tr>
      `;
    }).join('');
    
    tableBody.innerHTML = rows;
    
    // Update the last updated footer
    const lastUpdatedElement = document.getElementById('last-updated-time');
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = getLastUpdated();
    }
  }
  
  function initTradingTable() {
    const tableBody = document.getElementById('trading-table-body');
    if (!tableBody) {
      console.log('Trading table body not found - skipping initialization');
      return;
    }
    
    console.log('Initializing trading table...');
    
    // Show loading state
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Loading market data...</td></tr>';
    
    // Fetch initial price data
    fetchYahooPrices()
      .then(() => {
        console.log('Initial price data fetched successfully');
        renderTradingTable();
      })
      .catch(error => {
        console.error('Failed to fetch initial price data:', error);
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #e74c3c;">Failed to load market data. Please check your internet connection.</td></tr>';
        // Try to render anyway to show status
        setTimeout(renderTradingTable, 1000);
      });
    
    // Update prices every minute
    setInterval(() => {
      fetchYahooPrices().then(() => {
        console.log('Price data updated');
      }).catch(error => {
        console.warn('Failed to update price data:', error);
      });
    }, 60000);
    
    // Update countdown every second
    setInterval(renderTradingTable, 1000);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTradingTable);
  } else {
    initTradingTable();
  }
  
})();