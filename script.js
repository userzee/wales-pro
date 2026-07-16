// Wait until the entire webpage is completely loaded before running the slider code
document.addEventListener('DOMContentLoaded', () => {
    
    const slides = document.querySelectorAll('.custom-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    // Safety Check: If there are no slides found on the page, stop the script to prevent errors
    if (slides.length === 0) {
        console.error("Slider Error: No elements with class '.custom-slide' were found in the HTML.");
        return;
    }

    function changeSlide(index) {
        // Remove active class from the current slide
        slides[currentIndex].classList.remove('active');
        
        // Calculate the next index wrap-around safely
        currentIndex = (index + slides.length) % slides.length;
        
        // Add active class to the new slide
        slides[currentIndex].classList.add('active');
    }

    // Button Click Events
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(currentIndex + 1));
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(currentIndex - 1));
    }

    // Automatic transition loop (every 4 seconds)
    setInterval(() => {
        changeSlide(currentIndex + 1);
    }, 4000);

    console.log("Slider initialized successfully with " + slides.length + " slides!");
});
