// Wait until the entire webpage is completely loaded before running the slider code
document.addEventListener('DOMContentLoaded', () => {
    
    const slider = document.getElementById('slider'); 
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    // Safety Check
    if (slides.length === 0 || !slider) {
        console.error("Slider Error: Crucial slider tracks or elements were not found in the HTML.");
        return;
    }

    function changeSlide(index) {
        // Calculate the next index wrap-around safely
        currentIndex = (index + slides.length) % slides.length;
        
        // MOVES TRACK: Translates track across X plane relative to total active slide count
        slider.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
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
