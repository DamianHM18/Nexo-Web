// Funcionalidad para el menú responsive en dispositivos móviles
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Cambiar icono de barras a equis
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Simulación de envío del formulario de cotización
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const servicio = document.getElementById('servicio-interes').value;
        
        // Alerta de confirmación atractiva
        alert(`¡Gracias por contactar a NexoWeb, ${nombre}! Hemos recibido tu interés en el servicio de "${servicio}". Nos pondremos en contacto contigo a la brevedad para iniciar tu cotización.`);
        
        contactForm.reset();
    });
}


// =================================================================
// ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER OPTIMIZADO)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05 // Se activa de inmediato al asomar el elemento en pantalla
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: dejamos de observarlo una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selecciona todos los elementos clave de las páginas
    const elementsToAnimate = document.querySelectorAll('.feature-box, .plan-card, .brand-card, .service-detail-card, .faq-card, .step-card, .promo-card, .form-container, .info-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });
});

// =================================================================
// CONTROL DEL HEADER INTELIGENTE (VERSIÓN DEFINITIVA A PRUEBA DE FALLOS)
// =================================================================
let lastScrollTop = 0;
const mainHeader = document.querySelector('header'); // Busca la etiqueta header directamente
const scrollOffsetThreshold = 50;

window.addEventListener('scroll', () => {
    if (!mainHeader) return;

    let currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

    // Si estás arriba del todo, muestra el menú siempre
    if (currentScrollPos <= scrollOffsetThreshold) {
        mainHeader.classList.remove('header-hidden');
        lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
        return;
    }

    // Si bajas -> Oculta el header
    if (currentScrollPos > lastScrollTop) {
        mainHeader.classList.add('header-hidden');
    } 
    // Si subes -> Muestra el header de inmediato
    else if (currentScrollPos < lastScrollTop) {
        mainHeader.classList.remove('header-hidden');
    }

    lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
});