// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Reset error messages
        document.querySelectorAll('.error').forEach(el => el.remove());
        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
        
        // Validate name
        if (name === '') {
            showError('name', 'Por favor ingresa tu nombre');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('email', 'Por favor ingresa tu correo electrónico');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message', 'Por favor ingresa tu mensaje');
            isValid = false;
        }
        
        // If form is valid, submit it (in a real application, you would send this to a server)
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        }
    });
}

// Helper function to show error messages
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Add error class to form group
    formGroup.classList.add('error');
    
    // Create error message element
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#ff4d4d';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    
    // Insert error message after the field
    field.parentNode.insertBefore(error, field.nextSibling);
}

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = '#fff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .producto-content, .producto-image, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes
    const benefitCards = document.querySelectorAll('.benefit-card');
    const productoContent = document.querySelector('.producto-content');
    const productoImage = document.querySelector('.producto-image');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    // Set initial styles for animation
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`;
    });
    
    if (productoContent) {
        productoContent.style.opacity = '0';
        productoContent.style.transform = 'translateX(-30px)';
        productoContent.style.transition = 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s';
    }
    
    if (productoImage) {
        productoImage.style.opacity = '0';
        productoImage.style.transform = 'translateX(30px)';
        productoImage.style.transition = 'opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s';
    }
    
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateX(-30px)';
        contactInfo.style.transition = 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s';
    }
    
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateX(30px)';
        contactForm.style.transition = 'opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s';
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Add loaded class to body to enable transitions
    document.body.classList.add('loaded');
});
