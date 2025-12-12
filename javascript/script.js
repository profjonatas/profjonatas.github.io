// Navigation functionality - load external HTML files
function showSection(fileName, button) {
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    // Load file into main-content
    const mainContent = document.getElementById('main-content');
    fetch(fileName)
        .then(response => response.text())
        .then(html => {
            mainContent.innerHTML = html;

            // Reinitialize flashcards and carousels after content is loaded
            initFlashcards();
            initCarousels();
        })
        .catch(err => {
            mainContent.innerHTML = `<p>Erro ao carregar a página: ${fileName}</p>`;
            console.error(err);
        });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.dataset.file;
            showSection(fileName, this);
        });
    });

    // Load initial page
    const activeButton = document.querySelector('.nav-btn.active');
    if (activeButton) {
        showSection(activeButton.dataset.file, activeButton);
    }
});

// Carousel functionality
const carouselStates = {};

// Inicializar os carrosséis quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    startCarouselAutoplay();
});

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const id = carousel.id.replace('carousel-', '');
        carouselStates[id] = 0;
        updateCarousel(id);
    });
}

function updateCarousel(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const currentIndex = carouselStates[courseId];
    
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[currentIndex]) slides[currentIndex].classList.add('active');
    
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

function nextSlide(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const maxIndex = slides.length - 1;
    
    carouselStates[courseId] = (carouselStates[courseId] + 1) > maxIndex ? 0 : carouselStates[courseId] + 1;
    updateCarousel(courseId);
}

function prevSlide(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const maxIndex = slides.length - 1;
    
    carouselStates[courseId] = (carouselStates[courseId] - 1) < 0 ? maxIndex : carouselStates[courseId] - 1;
    updateCarousel(courseId);
}

// Flashcard functionality
function flipCard(card) {
    card.classList.toggle('flipped');
}

function startCarouselAutoplay() {
    setInterval(() => {
        Object.keys(carouselStates).forEach(courseId => {
            const carousel = document.getElementById(`carousel-${courseId}`);
            if (carousel) nextSlide(courseId); // atual avança
        });
    }, 5000);
}

let ultimaPosicaoScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const posicaoAtual = window.scrollY;

    if (posicaoAtual > ultimaPosicaoScroll) {
        // ROLANDO PARA BAIXO → ESCONDE
        header.style.top = "-120px"; 
    } else {
        // ROLANDO PARA CIMA → MOSTRA
        header.style.top = "0";
    }

    ultimaPosicaoScroll = posicaoAtual;
});

// Iniciar autoplay reverso quando a página carregar
document.addEventListener('DOMContentLoaded', startCarouselAutoplayReverse);


// Smooth scrolling and other functionalities can remain iguais
const currentPage = window.location.pathname.split("/").pop();
