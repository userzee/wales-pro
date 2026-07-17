document.addEventListener('DOMContentLoaded', () => {
    initMainHeroImageSlider();
    initBottomCardsCarouselSlider();
    initMobileMenu();
});

/**
 * Controller for Top Image Slider (Dynamic pixel width tracking and touch swiping)
 */
function initMainHeroImageSlider() {
    const sliderTrack = document.getElementById('slider');
    const totalSlides = document.querySelectorAll('.slide');
    const buttonPrev = document.getElementById('prevBtn');
    const buttonNext = document.getElementById('nextBtn');
    
    let activeIndex = 0;
    let autoTimer;

    if (!sliderTrack || totalSlides.length === 0) return;

    function moveToSlide(targetIndex) {
        activeIndex = (targetIndex + totalSlides.length) % totalSlides.length;
        
        // Grab the precise pixel width dynamically to avoid percentage shifting bugs
        const slideWidth = sliderTrack.parentElement.clientWidth;
        sliderTrack.style.transform = `translateX(-${activeIndex * slideWidth}px)`;
    }

    if (buttonNext) {
        buttonNext.addEventListener('click', () => { moveToSlide(activeIndex + 1); startLoop(); });
    }
    if (buttonPrev) {
        buttonPrev.addEventListener('click', () => { moveToSlide(activeIndex - 1); startLoop(); });
    }

    // Enhanced Real-Time Touch Support Configuration for Mobile Swipe
    let xStart = 0;
    let yStart = 0;
    let xDiff = 0;
    let yDiff = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        xStart = e.touches[0].clientX;
        yStart = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
        clearInterval(autoTimer);
    }, { passive: true });

    sliderTrack.addEventListener('touchmove', (e) => {
        if (!xStart || !yStart) return;

        const xCurrent = e.touches[0].clientX;
        const yCurrent = e.touches[0].clientY;

        xDiff = xStart - xCurrent;
        yDiff = yStart - yCurrent;
    }, { passive: true });

    sliderTrack.addEventListener('touchend', () => {
        const swipeThreshold = 50; // Minimum drag length in pixels required to trigger slide change

        // Evaluates whether horizontal swipe gesture is distinct from vertical scrolling
        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > swipeThreshold) {
            if (xDiff > 0) {
                moveToSlide(activeIndex + 1); // Swiped Left -> Load Next Slide
            } else {
                moveToSlide(activeIndex - 1); // Swiped Right -> Load Previous Slide
            }
        }

        // Reset tracking metrics and restart slider interval loops
        xStart = 0;
        yStart = 0;
        startLoop();
    }, { passive: true });

    function startLoop() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => moveToSlide(activeIndex + 1), 4000);
    }

    sliderTrack.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
    sliderTrack.parentElement.addEventListener('mouseleave', startLoop);
    
    // Tracks device orientations cleanly on screen resize
    window.addEventListener('resize', () => {
        moveToSlide(activeIndex);
    });
    
    startLoop();
}

/**
 * Controller for Bottom Horizontal Card Slider
 */
function initBottomCardsCarouselSlider() {
    const cardScrollContainer = document.getElementById("services-slider");
    const arrowNext = document.getElementById("slide-next");
    const arrowPrev = document.getElementById("slide-prev");

    if (!cardScrollContainer || !arrowNext || !arrowPrev) return;

    function calculateScrollOffset() {
        const structuralCard = cardScrollContainer.querySelector(".service-banner-box");
        if (!structuralCard) return 300;
        
        const runtimeStyle = window.getComputedStyle(cardScrollContainer);
        const gridGap = parseInt(runtimeStyle.gap) || 20;
        
        return structuralCard.getBoundingClientRect().width + gridGap;
    }

    arrowNext.addEventListener("click", () => {
        cardScrollContainer.scrollBy({ left: calculateScrollOffset(), behavior: 'smooth' });
    });

    arrowPrev.addEventListener("click", () => {
        cardScrollContainer.scrollBy({ left: -calculateScrollOffset(), behavior: 'smooth' });
    });
}

/**
 * Controller for Mobile Hamburger Dropdown Menu (Injects burger bars automatically)
 */
function initMobileMenu() {
    const header = document.querySelector('header');
    const navMenu = document.querySelector('nav');
    
    if (!header || !navMenu) return;

    // Creates the burger toggle button dynamically so your HTML doesn't change
    let menuToggle = document.getElementById('menuToggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.id = 'menuToggle';
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Navigation');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        header.insertBefore(menuToggle, navMenu);
    }

    const navLinks = navMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}
