
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.service-card, .feature-item, .process-card, .gallery-item').forEach(element => {
    observer.observe(element);
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelector('.stats-section').forEach(section => {
    statsObserver.observe(section);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.gallery-img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// // Navbar scroll effect
// let lastScroll = 0;
// const navbar = document.querySelector('.navbar');

// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;

//     if (currentScroll <= 0) {
//         navbar.classList.remove('scroll-up');
//         return;
//     }

//     if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
//         navbar.classList.remove('scroll-up');
//         navbar.classList.add('scroll-down');
//     } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
//         navbar.classList.remove('scroll-down');
//         navbar.classList.add('scroll-up');
//     }
//     lastScroll = currentScroll;
// });

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation and animation
const moveForm = document.getElementById('moveForm');

moveForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Add loading animation
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitBtn.style.backgroundColor = '#28a745';

        // Reset form after delay
        setTimeout(() => {
            submitBtn.innerHTML = 'Book Now';
            submitBtn.style.backgroundColor = '';
            this.reset();
        }, 2000);
    }, 1500);
});
