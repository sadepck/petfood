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

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.total = 0;
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.cartOverlay = document.querySelector('.cart-overlay');
        this.cartItems = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.total-amount');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        this.checkoutModal = document.querySelector('.checkout-modal');
        this.closeCheckout = document.querySelector('.close-checkout');
        this.backToCart = document.querySelector('.back-to-cart');
        this.shippingForm = document.getElementById('shippingForm');
        this.addToCartBtn = document.querySelector('.add-to-cart');
        this.quantityInput = document.getElementById('quantity');
        this.quantityMinus = document.querySelector('.quantity-btn.minus');
        this.quantityPlus = document.querySelector('.quantity-btn.plus');
        this.sizeSelect = document.getElementById('size');
        this.closeCartBtn = document.querySelector('.close-cart');
        
        this.init();
    }

    init() {
        // Load cart from localStorage
        this.loadCart();
        
        // Event Listeners
        this.cartIcon.addEventListener('click', () => this.toggleCart());
        this.cartOverlay.addEventListener('click', () => this.closeCart());
        this.checkoutBtn.addEventListener('click', () => this.openCheckout());
        this.closeCheckout.addEventListener('click', () => this.closeCheckoutModal());
        this.backToCart.addEventListener('click', () => this.backToCartFromCheckout());
        this.shippingForm.addEventListener('submit', (e) => this.handleOrderSubmit(e));
        
        // Product quantity controls
        if (this.quantityMinus && this.quantityPlus) {
            this.quantityMinus.addEventListener('click', () => this.adjustQuantity(-1));
            this.quantityPlus.addEventListener('click', () => this.adjustQuantity(1));
        }
        
        // Add to cart button
        if (this.addToCartBtn) {
            this.addToCartBtn.addEventListener('click', () => this.addToCart());
        }
        
        // Close cart button
        if (this.closeCartBtn) {
            this.closeCartBtn.addEventListener('click', () => this.closeCart());
        }
    }
    
    adjustQuantity(change) {
        let quantity = parseInt(this.quantityInput.value) + change;
        if (quantity < 1) quantity = 1;
        this.quantityInput.value = quantity;
    }
    
    addToCart() {
        const size = this.sizeSelect.value;
        const quantity = parseInt(this.quantityInput.value);
        const sizeText = this.sizeSelect.options[this.sizeSelect.selectedIndex].text;
        const price = this.getPriceBySize(size);
        
        const item = {
            id: `item-${size}-${Date.now()}`,
            name: 'Cachupín Premium',
            size: size,
            sizeText: sizeText,
            price: price,
            quantity: quantity,
            image: 'imagenes/producto.jpg' // Add your product image path
        };
        
        this.addItemToCart(item);
        this.showNotification('Producto añadido al carrito');
    }
    
    getPriceBySize(size) {
        const prices = {
            'small': 15.99,
            'medium': 29.99,
            'large': 49.99
        };
        return prices[size] || 29.99; // Default to medium price
    }
    
    addItemToCart(item) {
        this.cart.push(item);
        this.saveCart();
        this.updateCartUI();
    }
    
    removeItemFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateItemQuantity(itemId, newQuantity) {
        if (newQuantity < 1) return;
        
        this.cart = this.cart.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        
        this.saveCart();
        this.updateCartUI();
    }
    
    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    }
    
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
        this.updateCartCount();
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartUI();
        }
    }
    
    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = count;
        
        // Toggle cart count visibility
        if (count > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
    
    updateCartUI() {
        // Update cart count
        this.updateCartCount();
        
        // Clear current items
        this.cartItems.innerHTML = '';
        
        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            this.checkoutBtn.disabled = true;
            this.cartTotal.textContent = '$0.00';
            return;
        }
        
        // Add items to cart
        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p class="cart-item-size">${item.sizeText}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            this.cartItems.appendChild(itemElement);
        });
        
        // Update total
        this.total = this.calculateTotal();
        this.cartTotal.textContent = `$${this.total}`;
        this.checkoutBtn.disabled = false;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateItemQuantity(itemId, item.quantity - 1);
                }
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateItemQuantity(itemId, item.quantity + 1);
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                this.removeItemFromCart(itemId);
            });
        });
    }
    
    toggleCart() {
        this.cartSidebar.classList.toggle('active');
        this.cartOverlay.classList.toggle('active');
        document.body.style.overflow = this.cartSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    closeCart() {
        this.cartSidebar.classList.remove('active');
        this.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    openCheckout() {
        this.closeCart();
        this.checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeCheckoutModal() {
        this.checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    backToCartFromCheckout() {
        this.closeCheckoutModal();
        this.toggleCart();
    }
    
    handleOrderSubmit(e) {
        e.preventDefault();
        
        // Simple form validation
        const formData = new FormData(this.shippingForm);
        const formValues = {};
        let isValid = true;
        
        // Validate required fields
        formData.forEach((value, key) => {
            formValues[key] = value.trim();
            const input = document.querySelector(`[name="${key}"]`);
            const errorElement = document.getElementById(`${key}Error`);
            
            if (input.required && !value.trim()) {
                isValid = false;
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Este campo es obligatorio';
                    errorElement.style.display = 'block';
                }
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                
                // Email validation
                if (key === 'email' && !this.validateEmail(value)) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Por favor ingresa un correo electrónico válido';
                        errorElement.style.display = 'block';
                    }
                }
            }
        });
        
        if (!isValid) return;
        
        // If form is valid, process the order
        this.processOrder(formValues);
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    async processOrder(orderData) {
        // Show loading state
        const submitBtn = this.shippingForm.querySelector('.place-order-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Procesando...';
        
        try {
            // In a real application, you would send this data to your server
            console.log('Processing order:', {
                ...orderData,
                items: this.cart,
                total: this.total
            });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showNotification('¡Pedido realizado con éxito!', 'success');
            
            // Clear cart and close modals
            this.cart = [];
            this.saveCart();
            this.updateCartUI();
            this.closeCheckoutModal();
            this.shippingForm.reset();
            
        } catch (error) {
            console.error('Error processing order:', error);
            this.showNotification('Error al procesar el pedido. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add show class after a small delay for animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize shopping cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.error {
            background-color: #f44336;
        }
    `;
    document.head.appendChild(style);
});
