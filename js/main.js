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
    const formFields = {
        name: {
            element: document.getElementById('name'),
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            errorMessages: {
                required: 'El nombre es obligatorio',
                minLength: 'El nombre debe tener al menos 2 caracteres',
                maxLength: 'El nombre no puede tener más de 50 caracteres',
                pattern: 'El nombre solo puede contener letras y espacios'
            }
        },
        email: {
            element: document.getElementById('email'),
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessages: {
                required: 'El correo electrónico es obligatorio',
                pattern: 'Por favor ingresa un correo electrónico válido'
            }
        },
        phone: {
            element: document.getElementById('phone'),
            required: false,
            pattern: /^[0-9+\-\s()]*$/,
            errorMessages: {
                pattern: 'Por favor ingresa un número de teléfono válido'
            }
        },
        subject: {
            element: document.getElementById('subject'),
            required: true,
            errorMessages: {
                required: 'Por favor selecciona un asunto'
            }
        },
        message: {
            element: document.getElementById('message'),
            required: true,
            minLength: 10,
            errorMessages: {
                required: 'El mensaje es obligatorio',
                minLength: 'El mensaje debe tener al menos 10 caracteres'
            }
        }
    };

    // Add input event listeners for real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field.element) {
            field.element.addEventListener('input', () => validateField(fieldName));
            field.element.addEventListener('blur', () => validateField(fieldName));
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando...';
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                successMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
                successMessage.style.display = 'block';
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
                // Log form data (in a real app, send to server)
                const formData = {};
                Object.keys(formFields).forEach(fieldName => {
                    formData[fieldName] = formFields[fieldName].element.value;
                });
                console.log('Form data:', formData);
                
            }, 1500);
        }
    });
    
    // Field validation function
    function validateField(fieldName) {
        const field = formFields[fieldName];
        const value = field.element.value.trim();
        let isValid = true;
        
        // Clear previous error
        clearError(fieldName);
        
        // Skip validation for non-required empty fields
        if (!field.required && !value) {
            return true;
        }
        
        // Check required
        if (field.required && !value) {
            showError(fieldName, field.errorMessages.required);
            return false;
        }
        
        // Check min length
        if (field.minLength && value.length < field.minLength) {
            showError(fieldName, field.errorMessages.minLength);
            isValid = false;
        }
        
        // Check max length
        if (field.maxLength && value.length > field.maxLength) {
            showError(fieldName, field.errorMessages.maxLength);
            isValid = false;
        }
        
        // Check pattern
        if (field.pattern && !field.pattern.test(value)) {
            showError(fieldName, field.errorMessages.pattern);
            isValid = false;
        }
        
        // Update field status
        const formGroup = field.element.closest('.form-group');
        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        } else {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(fieldName, message) {
        const field = formFields[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error class to parent
            const formGroup = field.element.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
            }
        }
    }
    
    // Clear error message
    function clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            
            // Remove error class from parent
            const formGroup = errorElement.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
                formGroup.classList.remove('success');
            }
        }
    }
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
