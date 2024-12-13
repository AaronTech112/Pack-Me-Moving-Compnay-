
// Form handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#28a745';

        // Reset form after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// Floating label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    element.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
