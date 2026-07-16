let currentSlide = 0;
const totalSlides = 2; 
const sliderElement = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    sliderElement.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

setInterval(() => {
    moveSlide(1);
}, 6000);
