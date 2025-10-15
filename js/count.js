// Enhanced counter animation with easing
function animateCounterWithEasing(element, start, end, duration) {
    const startTime = performance.now();
    const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutQuad)
        const easeProgress = 1 - (1 - progress) * (1 - progress);

        const currentCount = Math.floor(start + (end - start) * easeProgress);
        element.textContent = currentCount;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = end;
        }
    };

    requestAnimationFrame(updateCount);
}

// Intersection Observer setup
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach((stat, index) => {
                const targetValue = parseInt(stat.getAttribute('data-count'));
                // Add slight delay for each subsequent number
                setTimeout(() => {
                    animateCounterWithEasing(stat, 0, targetValue, 2500);
                }, index * 200);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

// Start observing
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Format numbers with commas for better readability
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add this to your existing stats section HTML:
document.querySelectorAll('.stat-number').forEach(stat => {
    stat.innerHTML = '0';
});