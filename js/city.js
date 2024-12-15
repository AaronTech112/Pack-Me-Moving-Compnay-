document.addEventListener('DOMContentLoaded', function() {
    const statesWrapper = document.querySelector('.states-wrapper');
    const dotsContainer = document.querySelector('.carousel-dots');
    const stateItems = document.querySelectorAll('.state-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let intervalId;
    const itemsPerView = window.innerWidth <= 768 ? 4 : 6;
    const totalSlides = Math.ceil(stateItems.length / itemsPerView);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateCarousel(index) {
        const offset = -(index * (100 / itemsPerView));
        statesWrapper.style.transform = `translateX(${offset}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(currentIndex);
    }

    // Auto-slide functionality
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 2000); // Slides every 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    statesWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    statesWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-slide when hovering
    statesWrapper.addEventListener('mouseenter', stopAutoSlide);
    statesWrapper.addEventListener('mouseleave', startAutoSlide);
});