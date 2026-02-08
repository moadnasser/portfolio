// ========================================
// Navigation Functionality
// ========================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// Smooth scrolling and active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu after click
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all skill categories, project cards, and timeline items
const animatedElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .stat-item, .contact-card'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ========================================
// Project Cards Interaction
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const viewBtn = card.querySelector('.project-view-btn');
    
    if (viewBtn && !card.classList.contains('opensource')) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectData = card.getAttribute('data-project');
            showProjectModal(projectData);
        });
    }
});

function showProjectModal(projectId) {
    // Project details data
    const projects = {
        travelhub: {
            title: 'TravelHub - Travel Booking Platform',
            description: 'Comprehensive travel booking ecosystem with mobile apps (iOS/Android) and web portal enabling users to search, compare, and book flights, hotels, and car rentals.',
            features: [
                'Cross-platform mobile apps built with Flutter',
                'Next.js web portal with SSR for SEO',
                'Microservices backend architecture with Laravel',
                'Real-time price comparison engine',
                'Secure payment processing (Stripe & PayPal)',
                'Multi-currency support',
                'Admin dashboard with analytics',
                'Integration with 8+ travel APIs'
            ],
            technologies: ['Flutter', 'Riverpod', 'React.js', 'Next.js', 'TypeScript', 'Laravel 10', 'MySQL', 'Redis', 'Docker', 'AWS S3'],
            metrics: {
                bookings: '50K+',
                revenue: '$2M+',
                rating: '4.7★',
                uptime: '99.8%'
            }
        },
        retailpro: {
            title: 'RetailPro - POS & Inventory System',
            description: 'Enterprise-grade point of sale system with Flutter mobile app for sales terminals and React web dashboard for comprehensive business analytics.',
            features: [
                'Offline-first Flutter POS application',
                'Real-time inventory synchronization',
                'Multi-location support (50+ stores)',
                'Role-based access control',
                'Barcode scanning integration',
                'Automated reporting system',
                'Receipt printing and cash drawer management',
                'Sales analytics dashboard'
            ],
            technologies: ['Flutter', 'Bloc', 'React.js', 'Redux Toolkit', 'Laravel 9', 'MySQL', 'Redis Queue', 'WebSockets', 'TailwindCSS'],
            metrics: {
                transactions: '500K+',
                locations: '30',
                speed: '65% faster',
                accuracy: '85% improved'
            }
        },
        chatnow: {
            title: 'ChatNow - Real-Time Messaging App',
            description: 'Scalable real-time messaging application with end-to-end encryption, supporting one-on-one and group chats with rich media sharing.',
            features: [
                'Real-time WebSocket communication',
                'End-to-end message encryption',
                'Group chat functionality',
                'Media upload (images, videos, voice)',
                'Typing indicators and read receipts',
                'Push notifications via FCM',
                'Offline message caching',
                'Message search and archive'
            ],
            technologies: ['Flutter', 'Provider', 'WebSockets', 'Laravel 9', 'Redis', 'PostgreSQL', 'Firebase FCM', 'AWS S3'],
            metrics: {
                users: '50K+ DAU',
                messages: '100K+ daily',
                latency: '<100ms',
                delivery: '99.6%'
            }
        },
        smartfactory: {
            title: 'SmartFactory - IoT Dashboard System',
            description: 'Real-time industrial monitoring and control dashboard processing sensor data from IoT devices with advanced analytics and predictive alerts.',
            features: [
                'Real-time data visualization',
                'Interactive charts (Chart.js & D3.js)',
                'Event-driven alert system',
                'Historical data analysis',
                'Automated reporting',
                'Predictive maintenance alerts',
                'MQTT protocol integration',
                'Responsive tablet/desktop interface'
            ],
            technologies: ['React.js', 'TypeScript', 'Chart.js', 'D3.js', 'Laravel 10', 'MySQL', 'Redis', 'MQTT', 'Docker'],
            metrics: {
                sensors: '15M+ readings/day',
                accuracy: '99.9%',
                efficiency: '28% improved',
                downtime: '45% reduced'
            }
        },
        shophub: {
            title: 'ShopHub - E-commerce Marketplace',
            description: 'Full-featured multi-vendor e-commerce platform with advanced search, payment processing, and vendor management capabilities.',
            features: [
                'Multi-tenant vendor system',
                'Elasticsearch product search',
                'Shopping cart with abandoned recovery',
                'Stripe Connect payment split',
                'Vendor analytics dashboard',
                'Product review system',
                'CDN image optimization',
                'Mobile and web storefronts'
            ],
            technologies: ['Flutter', 'Riverpod', 'React.js', 'Next.js', 'Laravel 10', 'MySQL', 'Elasticsearch', 'Redis', 'Stripe Connect', 'AWS CloudFront'],
            metrics: {
                vendors: '150+',
                gmv: '$800K+',
                rating: '4.6★',
                conversion: '38% increase'
            }
        }
    };

    const project = projects[projectId];
    if (!project) return;

    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="projectModal">
            <div class="modal-content">
                <button class="modal-close" id="closeModal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                </div>
                <div class="modal-body">
                    <div class="modal-section">
                        <h3><i class="fas fa-check-circle"></i> Key Features</h3>
                        <ul class="feature-list">
                            ${project.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h3><i class="fas fa-code"></i> Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-section">
                        <h3><i class="fas fa-chart-line"></i> Key Metrics</h3>
                        <div class="metrics-grid">
                            ${Object.entries(project.metrics).map(([key, value]) => `
                                <div class="metric-card">
                                    <div class="metric-value">${value}</div>
                                    <div class="metric-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add modal styles dynamically
    const modalStyles = `
        <style id="modal-styles">
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                animation: fadeIn 0.3s ease;
                overflow-y: auto;
            }
            
            .modal-content {
                background: var(--bg-medium);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-xl);
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-close {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                background: rgba(255, 0, 0, 0.2);
                transform: rotate(90deg);
            }
            
            .modal-header {
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h2 {
                font-family: var(--font-heading);
                font-size: 1.75rem;
                margin-bottom: 0.5rem;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .modal-header p {
                color: var(--text-muted);
                line-height: 1.6;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-section {
                margin-bottom: 2rem;
            }
            
            .modal-section h3 {
                font-family: var(--font-heading);
                font-size: 1.25rem;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .modal-section h3 i {
                color: var(--primary-light);
            }
            
            .feature-list {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .feature-list li {
                padding-left: 1.5rem;
                position: relative;
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            .feature-list li::before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--primary-light);
                font-weight: bold;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .tech-tag {
                padding: 0.5rem 1rem;
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: var(--radius-md);
                color: var(--primary-light);
                font-size: 0.875rem;
                font-weight: 600;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .metric-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                text-align: center;
            }
            
            .metric-value {
                font-family: var(--font-heading);
                font-size: 1.75rem;
                font-weight: 800;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 0.5rem;
            }
            
            .metric-label {
                color: var(--text-muted);
                font-size: 0.875rem;
                text-transform: capitalize;
            }
            
            @media (max-width: 768px) {
                .modal-overlay {
                    padding: 1rem;
                }
                
                .modal-header, .modal-body {
                    padding: 1.5rem;
                }
                
                .metrics-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);

    // Close modal functionality
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.getElementById('modal-styles')?.remove();
        }, 300);
    }
}

// ========================================
// Stats Counter Animation
// ========================================

const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            
            // Check if it's a number or percentage
            const isPercentage = text.includes('%');
            const hasPlus = text.includes('+');
            const numMatch = text.match(/[\d.]+/);
            
            if (numMatch) {
                const finalValue = parseFloat(numMatch[0]);
                animateValue(target, 0, finalValue, 2000, isPercentage, hasPlus);
                statsObserver.unobserve(target);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(element, start, end, duration, isPercentage, hasPlus) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        let displayValue = current.toFixed(1);
        if (end >= 10) {
            displayValue = Math.round(current);
        }
        
        let suffix = '';
        if (isPercentage) suffix = '%';
        if (hasPlus) suffix = '+';
        
        element.textContent = displayValue + suffix;
    }, 16);
}

// ========================================
// Typing Effect for Hero (Optional)
// ========================================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const words = originalText.split(' | ');
    let currentIndex = 0;
    
    function rotateWords() {
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            heroSubtitle.textContent = words[currentIndex];
            heroSubtitle.style.opacity = '1';
        }, 300);
    }
    
    // Uncomment to enable word rotation
    // setInterval(rotateWords, 3000);
}

// ========================================
// Smooth Page Load
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Parallax Effect on Hero Background
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Console Easter Egg
// ========================================

console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #94a3b8;');
console.log('%chttps://github.com/moadnasser', 'font-size: 14px; color: #818cf8; text-decoration: underline;');
