document.getElementById('contactForm').addEventListener('submit', function(e) {
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
    const whatsappMessage = `*New Contact Form Submission*%0A
Name: ${name}%0A
Email: ${email}%0A
Phone: ${phone}%0A
Service: ${service}%0A
Message: ${message}`;

    // WhatsApp API URL
    const whatsappURL = `https://api.whatsapp.com/send?phone=2347061662905&text=${whatsappMessage}`;

    // Send email using EmailJS (you need to sign up at emailjs.com and include their SDK)
    // Add EmailJS SDK to your HTML:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

    const emailParams = {
        to_email: "Packmecompany@gmail.com",
        from_name: name,
        from_email: email,
        phone_number: phone,
        service_type: service,
        message: message
    };

    // Send email
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
        .then(function(response) {
            console.log("Email sent successfully!", response);

            // Redirect to WhatsApp
            window.open(whatsappURL, '_blank');

            // Update button state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';

            // Reset form after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                document.getElementById('contactForm').reset();
            }, 2000);
        })
        .catch(function(error) {
            console.error("Email sending failed:", error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
            submitBtn.style.backgroundColor = '#dc3545';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 2000);
        });
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