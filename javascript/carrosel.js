document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const nextBtn = carousel.querySelector("[data-next]");
    const prevBtn = carousel.querySelector("[data-prev]");
    const images = track.querySelectorAll("img");

    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(${-index * 350}px)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });
});
