document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const submitBtn = this.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Prepare WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*%0A%0A
Name: ${name}%0A
Email: ${email}%0A
Phone: ${phone}%0A
Service: ${service}%0A
Message: ${message}`;

    // WhatsApp API URL
    const whatsappURL = `https://api.whatsapp.com/send?phone=2347061662905&text=${whatsappMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');

    // Update button state and reset form
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.backgroundColor = '#28a745';

    // Reset form after delay
    setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
        this.reset();
    }, 2000);
});

// Floating label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    element.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});