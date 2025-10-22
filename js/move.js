document.getElementById('moveForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const moveFrom = document.getElementById('moveFrom').value;
    const moveTo = document.getElementById('moveTo').value;
    const moveDate = document.getElementById('moveDate').value;
    const moveItems = document.getElementById('moveItems').value;

    const message = `Hello! I would like to book a move:%0A
    From: ${moveFrom}%0A
    To: ${moveTo}%0A
    Date: ${moveDate}%0A
    Items: ${moveItems}`;

    window.open(`https://wa.me/2348060505631?text=${message}`, '_blank');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});