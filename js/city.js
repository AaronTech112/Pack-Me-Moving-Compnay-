document.addEventListener('DOMContentLoaded', function() {
    const statesWrapper = document.querySelector('.states-wrapper');
    const dotsContainer = document.querySelector('.carousel-dots');
    const stateItems = document.querySelectorAll('.state-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let intervalId;
    const itemsPerView = window.innerWidth <= 768 ? 3 : 5;
    const totalSlides = Math.max(1, stateItems.length - (itemsPerView - 1));

    // Clone items for infinite scroll
    const cloneItems = () => {
        const firstClones = Array.from(stateItems).slice(0, itemsPerView)
            .map(item => item.cloneNode(true));
        const lastClones = Array.from(stateItems).slice(-itemsPerView)
            .map(item => item.cloneNode(true));
        
        firstClones.forEach(clone => statesWrapper.appendChild(clone));
        lastClones.forEach(clone => statesWrapper.insertBefore(clone, statesWrapper.firstChild));
    };

    cloneItems();

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    // Set initial position
    statesWrapper.style.transform = `translateX(-${itemsPerView * 100}px)`;

    function updateCarousel(index, transition = true) {
        if (transition) {
            statesWrapper.style.transition = 'transform 0.5s ease';
        } else {
            statesWrapper.style.transition = 'none';
        }

        const slideWidth = stateItems[0].offsetWidth + parseFloat(getComputedStyle(stateItems[0]).marginRight);
        const offset = -((index + itemsPerView) * slideWidth);
        statesWrapper.style.transform = `translateX(${offset}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index % totalSlides);
        });
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel(currentIndex);

        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(currentIndex, false);
            }, 500);
        }
    }

    function prevSlide() {
        currentIndex--;
        updateCarousel(currentIndex);

        if (currentIndex < 0) {
            setTimeout(() => {
                currentIndex = totalSlides - 1;
                updateCarousel(currentIndex, false);
            }, 500);
        }
    }

    // Auto-slide functionality
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 3000);
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

    // Handle resize
    window.addEventListener('resize', () => {
        updateCarousel(currentIndex, false);
    });

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-slide when hovering
    statesWrapper.addEventListener('mouseenter', stopAutoSlide);
    statesWrapper.addEventListener('mouseleave', startAutoSlide);
});