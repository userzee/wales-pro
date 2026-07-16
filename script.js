document.addEventListener('DOMContentLoaded', () => {
    // Initialize both sliders independently
    initImageSlider();
    initCardSlider();
});

/**
 * Component 1: Top Hero/Image Banner Slider (Full-Width Translation)
 */
function initImageSlider() {
    const slider = document.getElementById('slider'); 
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoPlayTimer;

    // Safety check to prevent errors if elements do not exist on the current page
    if (!slider || slides.length === 0) {
        console.warn("Image Slider Warning: Essential elements missing from HTML template.");
        return;
    }

    function changeSlide(index) {
        // Calculate the next index wrap-around cleanly
        currentIndex = (index + slides.length) % slides.length;
        
        // Moves the track across the X-axis relative to total active slide count
        slider.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
    }

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            changeSlide(currentIndex + 1);
            resetAutoPlay();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            changeSlide(currentIndex - 1);
            resetAutoPlay();
        });
    }

    // Automatic transition interval management
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            changeSlide(currentIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause automation on hover for better user accessibility
    slider.parentElement.addEventListener('mouseenter', stopAutoPlay);
    slider.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Run autoplay on load
    startAutoPlay();
    console.log(`Image slider running smoothly with ${slides.length} nodes.`);
}

/**
 * Component 2: Bottom Services Card Slider (Horizontal Scroll)
 */
function initCardSlider() {
    const cardTrack = document.getElementById("services-slider");
    const nextCardBtn = document.getElementById("slide-next");
    const prevCardBtn = document.getElementById("slide-prev");

    if (!cardTrack || !nextCardBtn || !prevCardBtn) {
        console.warn("Card Slider Warning: Navigation buttons or scroll track container missing.");
        return;
    }

    // Helper function to calculate active card step width dynamically on resize
    function getScrollStep() {
        const structuralCard = cardTrack.querySelector(".service-banner-box");
        if (!structuralCard) return 300; // Fallback pixel width
        
        // Measures card viewport footprint plus the layout grid gap (20px)
        return structuralCard.clientWidth + 20;
    }

    // Scroll click actions
    nextCardBtn.addEventListener("click", () => {
        cardTrack.scrollLeft += getScrollStep();
    });

    prevCardBtn.addEventListener("click", () => {
        cardTrack.scrollLeft -= getScrollStep();
    });
}
