let serviciuSlideIndex = 0;
const slidesToShow = 2;

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track .serviciu-slide');
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesToShow);

    // Clamp index
    if (serviciuSlideIndex < 0) serviciuSlideIndex = 0;
    if (serviciuSlideIndex > maxIndex) serviciuSlideIndex = maxIndex;

    // Move the track
    track.style.transform = `translateX(-${serviciuSlideIndex * slideWidth}px)`;

    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === serviciuSlideIndex);
    });
}

function goToSlide(index) {
    serviciuSlideIndex = index;
    updateCarousel();
}

function createDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    const slides = document.querySelectorAll('.carousel-track .serviciu-slide');
    const totalSlides = slides.length;
    const dotsCount = Math.max(1, totalSlides - slidesToShow + 1);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    updateCarousel();
    enableCarouselDrag();
});

// Drag/Swipe support
function enableCarouselDrag() {
    const track = document.querySelector('.carousel-track');
    let isDown = false;
    let startX, scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('dragging');
        startX = e.pageX;
        scrollLeft = serviciuSlideIndex;
    });
    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('dragging');
    });
    track.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('dragging');
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 50) {
            if (dx < 0) serviciuSlideIndex++;
            else serviciuSlideIndex--;
            updateCarousel();
        }
    });
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        // Optionally, you can add a visual effect here
    });

    // Touch events for mobile
    track.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX;
        scrollLeft = serviciuSlideIndex;
    });
    track.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        const dx = e.changedTouches[0].pageX - startX;
        if (Math.abs(dx) > 50) {
            if (dx < 0) serviciuSlideIndex++;
            else serviciuSlideIndex--;
            updateCarousel();
        }
    });
    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        // Optionally, you can add a visual effect here
    });
}
track.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Adaugă această linie!
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX;
    scrollLeft = serviciuSlideIndex;
});
track.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Adaugă această linie!
    isDown = true;
    startX = e.touches[0].pageX;
    scrollLeft = serviciuSlideIndex;
});