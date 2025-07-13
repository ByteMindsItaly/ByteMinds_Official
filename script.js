        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const header = document.getElementById('main-header');
            const body = document.body;
            const mouseLight = document.getElementById('mouse-light-effect');

            // Function to update scroll-padding-top for smooth scrolling to sections
            function updateScrollPadding() {
                const headerRect = header.getBoundingClientRect();
                const effectiveHeaderHeight = headerRect.height + headerRect.top;
                body.style.scrollPaddingTop = `${effectiveHeaderHeight + 20}px`; // Add extra padding below the header
            }

            // Set initial scroll padding
            updateScrollPadding();

            // Update padding on window resize
            window.addEventListener('resize', updateScrollPadding);

            // Smooth scroll for nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Store original background colors and box shadows for all elements that might have hover effects
            const originalStates = new Map();
            gsap.utils.toArray(".glass-effect, .btn-glass").forEach(element => {
                const computedStyle = window.getComputedStyle(element);
                originalStates.set(element, {
                    backgroundColor: computedStyle.backgroundColor,
                    boxShadow: computedStyle.boxShadow
                });
            });

            // GSAP Animations for hover effects
            const glassElements = gsap.utils.toArray(".glass-effect");

            glassElements.forEach(element => {
                // Exclude footer and buttons from hover animations
                if (element.tagName.toLowerCase() === 'footer' || element.classList.contains('btn-glass')) {
                    return;
                }

                // Initial state (no movement)
                gsap.set(element, {y: 0});

                // Removed mouseenter and mouseleave event listeners for .glass-effect elements
                // to completely remove the hover effect on them.
            });

            // Re-apply hover effect for buttons specifically
            const btnGlassElements = gsap.utils.toArray(".btn-glass");
            btnGlassElements.forEach(button => {
                const originalBtnState = originalStates.get(button); // Retrieve original state for buttons

                button.addEventListener("mouseenter", () => {
                    gsap.to(button, {
                        boxShadow: "0 5px 20px rgba(0, 122, 255, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)", // Slightly more pronounced button shadow on hover
                        backgroundColor: "rgba(0, 122, 255, 0.3)", // More opaque blue on hover
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });

                button.addEventListener("mouseleave", () => {
                    gsap.to(button, {
                        boxShadow: originalBtnState.boxShadow,
                        backgroundColor: originalBtnState.backgroundColor,
                        duration: 0.15,
                        ease: "power2.out"
                    });
                });
            });


            // Mouse light effect animation
            let mouseX = 0;
            let mouseY = 0;
            const easeFactor = 0.1; // Controls how smoothly the light follows the mouse

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                // Show the light effect when mouse moves
                gsap.to(mouseLight, {opacity: 1, duration: 0.3});

                // Animate the light position directly, with centering handled by GSAP's xPercent/yPercent
                gsap.to(mouseLight, {
                    x: mouseX,
                    y: mouseY,
                    xPercent: -50, // Center horizontally
                    yPercent: -75, // Adjusted to move the light source slightly up relative to the cursor
                    duration: easeFactor, // Use easeFactor for smooth following
                    ease: "power2.out"
                });
            });

            // Hide the light effect when mouse leaves the window
            document.body.addEventListener('mouseleave', () => {
                gsap.to(mouseLight, {opacity: 0, duration: 0.5});
            });
        });