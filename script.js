document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('main-header');
    const body = document.body;

    // Function to update scroll-padding-top
    function updateScrollPadding() {
        if (header) {
            body.style.scrollPaddingTop = `${header.offsetHeight}px`;
        }
    }

    // Initial call to set padding
    updateScrollPadding();

    // Update padding on window resize
    window.addEventListener('resize', updateScrollPadding);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use scrollIntoView with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
