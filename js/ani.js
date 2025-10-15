document.addEventListener('DOMContentLoaded', () => {
    // Form submission animation
    const moveForm = document.getElementById('moveForm');
    moveForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Quote Requested!';
            submitBtn.style.backgroundColor = '#28a745';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Set minimum date to today
    const moveDate = document.getElementById('moveDate');
    const today = new Date().toISOString().split('T')[0];
    moveDate.setAttribute('min', today);
});