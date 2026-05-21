// ==========================================================================
// HERO SLIDESHOW AUTOPLAY CONTROLLER
// ==========================================================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-section .slide');
    if (slides.length === 0) return; // Quietly exit if slider doesn't exist on page

    let currentSlideIndex = 0;
    const slideIntervalTime = 5000; // Time interval loop speed (5000ms = 5 seconds)

    setInterval(() => {
        // 1. Remove active state from current slide image layout
        slides[currentSlideIndex].classList.remove('active');

        // 2. Increment pointer index array track, reset to 0 after slide 3
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // 3. Mount active animation opacity rules onto next targeted slide item
        slides[currentSlideIndex].classList.add('active');
    }, slideIntervalTime);
}

// Fire the initializer engine when the document is ready
document.addEventListener('DOMContentLoaded', initHeroSlider);