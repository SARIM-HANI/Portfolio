// ============================================
// Portfolio Website - Main JavaScript File
// ============================================

// Global variables
let allProjects = [];
let filteredProjects = [];

// ============================================
// Theme Toggle Functionality
// ============================================

/**
 * Initialize theme based on localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(theme);
}

/**
 * Set theme and update toggle button
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ============================================
// Mobile Navigation
// ============================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * Close mobile menu when clicking on a link
 */
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

/**
 * Handle smooth scrolling for navigation links
 */
function handleNavClick(e) {
    const href = e.target.getAttribute('href');
    
    // Only handle anchor links
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            closeMobileMenu();
        }
    }
}

// ============================================
// Projects Loading and Display
// ============================================

// Extra metadata for project detail panel (dropdown)
const projectMeta = {
    'Automated SBOM Creation Tool': {
        languagesAndTools: [
            'Python, Flask, MySQL',
            'Syft for SBOM generation, Grype for vulnerability scanning'
        ],
        skills: [
            'Designed SBOM comparison logic across software versions',
            'Worked with database-backed security monitoring dashboards'
        ],
        experience: [
            'Hands-on experience with software supply-chain security concepts',
            'Built a full-stack tool from data gathering to visualization'
        ],
        image: 'assets/images/sbom-workflow.svg'
    },
    'Automated Construction Progress Monitoring': {
        languagesAndTools: [
            'Python, YOLOv8, OpenCV',
            'Rasterio, NumPy, Matplotlib with GeoTIFF drone imagery'
        ],
        skills: [
            'Fine-tuned YOLOv8 model from 80% to 95% accuracy',
            'Developed NDVI-based segmentation and pixel-based progress calculation'
        ],
        experience: [
            'Worked as Research Assistant on real construction-site data',
            'Gained experience in geospatial analysis and computer vision workflows'
        ],
        image: 'assets/images/construction-workflow.svg'
    },
    'Flight Fare Prediction Using Machine Learning': {
        languagesAndTools: [
            'Python, Pandas, NumPy, Scikit-learn',
            'Random Forest Regressor, Flask, Kaggle dataset'
        ],
        skills: [
            'End‑to‑end feature engineering on time, duration, route, and stop data',
            'Model evaluation and hyper‑parameter tuning using MAE, MSE, RMSE, and R²'
        ],
        experience: [
            'Built and deployed a regression model as a Flask web application',
            'Hands‑on experience with production‑style ML pipeline and pickled models'
        ],
        image: null
    },
    'Table Tennis 3D': {
        languagesAndTools: [
            'Unity Engine, C#',
            'Unity physics, colliders, rigidbodies, camera systems'
        ],
        skills: [
            'Implemented real‑time 3D game mechanics with physics‑based ball and paddle interactions',
            'Designed game state management for serving, scoring, and match flow'
        ],
        experience: [
            'Built and exported a standalone Windows build of a Unity game',
            'Gained practical experience with Mono/.NET scripting and Unity’s component‑based architecture'
        ],
        image: null
    }
};

/**
 * Load projects from JSON file or fallback (for local file:// opening)
 */
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        allProjects = data.projects || [];
    } catch (error) {
        // Use fallback when fetch fails (e.g. opening via file://)
        const fallbackEl = document.getElementById('projects-fallback');
        if (fallbackEl) {
            try {
                const data = JSON.parse(fallbackEl.textContent);
                allProjects = data.projects || [];
            } catch (e) {
                console.error('Fallback parse error:', e);
            }
        }
        if (allProjects.length === 0) {
            displayError('Failed to load projects. Please check if data/projects.json exists.');
            return;
        }
    }
    filteredProjects = [...allProjects];
    initializeTechFilter();
    initializeProjectDropdown();
    renderProjects();
}

/**
 * Initialize project dropdown - lists all projects, shows detail on select
 */
function initializeProjectDropdown() {
    const projectSelect = document.getElementById('project-select');
    if (!projectSelect) return;
    // Clear except first option
    while (projectSelect.options.length > 1) projectSelect.remove(1);
    allProjects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = project.title;
        option.textContent = project.title;
        projectSelect.appendChild(option);
    });
    projectSelect.addEventListener('change', function () {
        const title = this.value;
        if (!title) {
            updateProjectDetail(null);
            return;
        }
        const project = allProjects.find(p => p.title === title);
        updateProjectDetail(project);
    });
}

/**
 * Update the project detail panel when a project is selected
 */
function updateProjectDetail(project) {
    const detailEl = document.getElementById('project-detail');
    if (!detailEl) return;

    if (!project) {
        detailEl.classList.add('hidden');
        return;
    }

    const meta = projectMeta[project.title] || {};

    const titleEl = document.getElementById('project-detail-title');
    const langList = document.getElementById('project-detail-languages');
    const skillsList = document.getElementById('project-detail-skills');
    const expList = document.getElementById('project-detail-experience');
    const imageEl = document.getElementById('project-detail-image');

    titleEl.textContent = project.title;

    function populateList(ul, items) {
        ul.innerHTML = '';
        (items || []).forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            ul.appendChild(li);
        });
    }

    populateList(langList, meta.languagesAndTools);
    populateList(skillsList, meta.skills);
    populateList(expList, meta.experience);

    if (meta.image) {
        imageEl.src = meta.image;
        imageEl.alt = project.title + ' visual';
    } else {
        imageEl.src = '';
        imageEl.alt = '';
    }

    detailEl.classList.remove('hidden');
    // Scroll into view for better UX
    detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Initialize tech stack filter dropdown
 */
function initializeTechFilter() {
    const filterSelect = document.getElementById('filter-select');
    
    // Get all unique tech stacks
    const techStacks = new Set();
    allProjects.forEach(project => {
        if (project.techStack && Array.isArray(project.techStack)) {
            project.techStack.forEach(tech => techStacks.add(tech));
        }
    });
    
    // Sort tech stacks alphabetically
    const sortedTechStacks = Array.from(techStacks).sort();
    
    // Add options to select (keep "All Technologies" option)
    sortedTechStacks.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech;
        option.textContent = tech;
        filterSelect.appendChild(option);
    });
}

/**
 * Render projects to the grid
 */
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Show message if no projects
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-results">No projects found matching your criteria.</p>';
        return;
    }
    
    // Create project cards
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

/**
 * Create a project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Project image (if available)
    let imageHTML = '';
    if (project.image) {
        imageHTML = `<img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">`;
    }
    
    // Tech stack tags
    let techTagsHTML = '';
    if (project.techStack && Array.isArray(project.techStack)) {
        techTagsHTML = project.techStack
            .map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
            .join('');
    }
    
    // Project link: only View Project
    let linksHTML = '';
    if (project.projectPage) {
        linksHTML += `<a href="${project.projectPage}" class="project-link">📄 View Project</a>`;
    }
    
    card.innerHTML = `
        ${imageHTML}
        <div class="project-content">
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            ${techTagsHTML ? `<div class="project-tech">${techTagsHTML}</div>` : ''}
            ${linksHTML ? `<div class="project-links">${linksHTML}</div>` : ''}
        </div>
    `;
    
    return card;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Display error message
 */
function displayError(message) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = `<p class="no-results">${escapeHtml(message)}</p>`;
}

// ============================================
// Search and Filter Functionality
// ============================================

/**
 * Filter projects based on tech stack
 */
function filterProjects() {
    const filterSelect = document.getElementById('filter-select');
    const filterValue = filterSelect ? filterSelect.value : '';
    
    filteredProjects = allProjects.filter(project => {
        const matchesTech = !filterValue || 
            (project.techStack && project.techStack.includes(filterValue));
        return matchesTech;
    });
    
    renderProjects();
}

// ============================================
// Event Listeners Setup
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Filter select
    const filterSelect = document.getElementById('filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterProjects);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ============================================
// Initialize Application
// ============================================

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize event listeners
    initEventListeners();
    
    // Load projects
    loadProjects();
});
