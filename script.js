const slides = document.querySelectorAll('.custom-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function changeSlide(index) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => changeSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => changeSlide(currentIndex - 1));

setInterval(() => {
    changeSlide(currentIndex + 1);
}, 4000);
