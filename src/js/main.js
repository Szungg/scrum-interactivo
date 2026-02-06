/**
 * Main Module - Maneja la carga y inicialización de componentes
 */

// ========== CARGA DINÁMICA DE COMPONENTES ==========
const ComponentLoader = {
    components: {},
    
    async load(name, path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${name}`);
            this.components[name] = await response.text();
            return this.components[name];
        } catch (error) {
            console.error(`Error loading component ${name}:`, error);
            return '';
        }
    },
    
    async loadMultiple(components) {
        const promises = components.map(({ name, path }) => 
            this.load(name, path)
        );
        await Promise.all(promises);
    },
    
    render(name) {
        return this.components[name] || '';
    },
    
    async init() {
        // Cargar todos los componentes desde sus carpetas
        await this.loadMultiple([
            { name: 'navbar', path: 'src/components/navbar/navbar.html' },
            { name: 'theme-toggle', path: 'src/components/theme-toggle/theme-toggle.html' },
            { name: 'inicio', path: 'src/components/inicio/inicio.html' },
            { name: 'que-es', path: 'src/components/que-es/que-es.html' },
            { name: 'roles', path: 'src/components/roles/roles.html' },
            { name: 'eventos', path: 'src/components/eventos/eventos.html' },
            { name: 'presentacion', path: 'src/components/presentacion/presentacion.html' },
            { name: 'caso-estudio', path: 'src/components/caso-estudio/caso-estudio.html' },
            { name: 'music-player', path: 'src/components/music-player/music-player.html' },
            { name: 'footer', path: 'src/components/footer/footer.html' }
        ]);
        
        // Inyectar navbar
        const navContainer = document.getElementById('nav-container');
        if (navContainer) {
            navContainer.innerHTML = this.render('navbar');
        }

        // Inyectar theme toggle en navbar
        const toggleContainer = document.getElementById('theme-toggle-container');
        if (toggleContainer) {
            toggleContainer.innerHTML = this.render('theme-toggle');
        }

        // Inyectar music player
        const musicContainer = document.getElementById('music-player-container');
        if (musicContainer) {
            musicContainer.innerHTML = this.render('music-player');
        }
        
        // Inyectar componentes principales
        const container = document.getElementById('component-container');
        if (container) {
            container.innerHTML = 
                this.render('inicio') +
                this.render('que-es') +
                this.render('roles') +
                this.render('eventos') +
                this.render('presentacion') +
                this.render('caso-estudio');
        }
        
        // Inyectar footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.render('footer');
        }
        
        // Inicializar interactividad
        initializeAllInteractivity();
    }
};

// ========== INICIALIZACIÓN DE COMPONENTES ==========
function initializeAllInteractivity() {
    // Navegación
    setupNavigation();

    // Tema claro/oscuro
    setupThemeToggle();
    
    // Detalles de roles
    initializeRoleDetails();
    
    // Tabs de eventos
    initializeEventTabs();
    
    // Tabs del caso de estudio
    initializeCaseTabs();
    
    // Intersection Observer para animaciones
    setupIntersectionObserver();
    
    // Navegación por teclado
    setupKeyboardNavigation();

    // Sidebar de musica
    setupMusicSidebar();
}

// ========== NAVEGACIÓN ========== 
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            // Obtener el id de la sección
            const sectionId = this.getAttribute('data-section');
            
            // Cambiar las secciones
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// ========== TEMA CLARO/OSCURO ==========
function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const srLabel = toggle.querySelector('.theme-toggle__sr');

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme) => {
        document.body.classList.toggle('theme-dark', theme === 'dark');
        localStorage.setItem('theme', theme);
        toggle.setAttribute('aria-pressed', theme === 'dark');
        toggle.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        toggle.dataset.theme = theme;
        if (srLabel) {
            srLabel.textContent = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        }
    };

    applyTheme(initialTheme);

    toggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

// ========== DETALLES DE ROLES ========== 
function initializeRoleDetails() {
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            
            // Alternar clase visible
            details.classList.toggle('visible');
            this.classList.toggle('is-open');
            
            // Cambiar texto del botón
            if (details.classList.contains('visible')) {
                this.textContent = 'Ocultar Detalles';
            } else {
                this.textContent = 'Ver Detalles';
            }
        });
    });
}

// ========== TABS DE EVENTOS ========== 
function initializeEventTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Remover clase active de todos los contenidos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Agregar clase active al contenido correspondiente
            document.querySelector(`[data-tab="${tabName}"].tab-content`).classList.add('active');
        });
    });
}

// ========== TABS DEL CASO DE ESTUDIO ========== 
function initializeCaseTabs() {
    document.querySelectorAll('.case-tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-case-tab');
            
            // Remover clase active de todos los botones
            document.querySelectorAll('.case-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Remover clase active de todos los contenidos
            document.querySelectorAll('.case-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Agregar clase active al contenido correspondiente
            document.querySelector(`[data-case-tab="${tabName}"].case-tab-content`).classList.add('active');
        });
    });
}

// ========== INTERSECTION OBSERVER PARA ANIMACIONES ========== 
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero-card, .role-card, .sprint-card, .team-member, .result-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ========== KEYBOARD NAVIGATION ========== 
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            const sectionMap = {
                '1': 'inicio',
                '2': 'que-es',
                '3': 'roles',
                '4': 'eventos',
                '5': 'presentacion',
                '6': 'caso-estudio'
            };
            
            if (sectionMap[e.key]) {
                e.preventDefault();
                const sectionId = sectionMap[e.key];
                
                // Actualizar navegación
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const navLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (navLink) navLink.classList.add('active');
                
                // Cambiar sección
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    });
}


// ========== INICIAR APLICACIÓN ==========
document.addEventListener('DOMContentLoaded', async () => {
    await ComponentLoader.init();
});
