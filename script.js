// Marketing Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Portfolio Filter
    initPortfolioFilter();
    
    // Form Validation and Submission
    initContactForm();
    initSubscriptionForm();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
        let currentSlide = 0;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.add('hidden');
            });
            
            // Remove active class from all dots
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
                dot.classList.add('bg-gray-300');
                dot.classList.remove('bg-blue-600');
            });
            
            // Show the current slide
            testimonialSlides[index].classList.remove('hidden');
            
            // Add active class to current dot
            testimonialDots[index].classList.add('active');
            testimonialDots[index].classList.remove('bg-gray-300');
            testimonialDots[index].classList.add('bg-blue-600');
            
            currentSlide = index;
        }
        
        // Add click event to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(nextSlide);
        }, 5000);
        
        // Show first slide initially
        showSlide(0);
    }
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-blue-600');
                    btn.classList.remove('text-white');
                    btn.classList.add('bg-gray-200');
                    btn.classList.add('text-gray-700');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                button.classList.remove('bg-gray-200');
                button.classList.remove('text-gray-700');
                button.classList.add('bg-blue-600');
                button.classList.add('text-white');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccess = document.getElementById('close-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the success message
            if (successMessage) {
                successMessage.classList.remove('hidden');
                contactForm.reset();
            }
        });
        
        // Close success message
        if (closeSuccess) {
            closeSuccess.addEventListener('click', function() {
                successMessage.classList.add('hidden');
            });
        }
    }
}

// Subscription Form Validation and Submission
function initSubscriptionForm() {
    const subscriptionForm = document.getElementById('subscription-form');
    const subscriptionMessage = document.getElementById('subscription-message');
    
    if (subscriptionForm && subscriptionMessage) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = document.getElementById('email').value.trim();
            
            // Simple validation
            if (email === '') {
                showSubscriptionMessage('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showSubscriptionMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send the email to a server here
            // For this demo, we'll just show a success message
            showSubscriptionMessage('Thank you for subscribing to our newsletter!', 'success');
            subscriptionForm.reset();
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show subscription messages
function showSubscriptionMessage(message, type) {
    const subscriptionMessage = document.getElementById('subscription-message');
    
    if (subscriptionMessage) {
        subscriptionMessage.textContent = message;
        subscriptionMessage.classList.remove('hidden');
        
        if (type === 'success') {
            subscriptionMessage.className = 'mt-4 text-green-600 bg-green-100 p-3 rounded-lg';
        } else {
            subscriptionMessage.className = 'mt-4 text-red-600 bg-red-100 p-3 rounded-lg';
        }
        
        // Hide message after 5 seconds
        setTimeout(() => {
            subscriptionMessage.classList.add('hidden');
        }, 5000);
    }
}