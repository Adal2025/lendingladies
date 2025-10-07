document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL SLIDER (REESCRITA PARA MÚLTIPLES SLIDERS) ---
    // Seleccionamos todas las tarjetas de evento
    const eventCards = document.querySelectorAll('.event-card');

    // Recorremos cada tarjeta para asignarle su propia funcionalidad de slider
    eventCards.forEach(card => {
        // Seleccionamos los elementos SOLO dentro de esta tarjeta
        const slidesContainer = card.querySelector('.slider-images');
        const prevButton = card.querySelector('.nav-btn.prev');
        const nextButton = card.querySelector('.nav-btn.next');
        const sliderImages = card.querySelectorAll('.slider-img');

        // Si una tarjeta no tiene slider, no hacemos nada
        if (!slidesContainer || !prevButton || !nextButton || sliderImages.length === 0) {
            return;
        }

        // Cada slider tendrá su propio índice
        let slideIndex = 0;
        const totalSlides = sliderImages.length;

        function moveSlide(direction) {
    // Actualizamos el índice solo para este slider
    slideIndex = (slideIndex + direction + totalSlides) % totalSlides;

    // --- ESTA ES LA LÍNEA QUE CAMBIA ---
    // Ahora el movimiento es mucho más simple: 100% por cada slide
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

        // Asignamos los eventos a los botones de ESTA tarjeta
        prevButton.addEventListener('click', () => moveSlide(-1));
        nextButton.addEventListener('click', () => moveSlide(1));
    });


    // --- LÓGICA DEL LIGHTBOX (SIN CAMBIOS, YA FUNCIONA CON MÚLTIPLES IMÁGENES) ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const allSliderImages = document.querySelectorAll('.slider-img'); // Selecciona todas las imágenes de todos los sliders
    let currentImageIndex;

    const imagesArray = Array.from(allSliderImages);

    imagesArray.forEach((image, index) => {
        image.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImage.src = this.src;
            currentImageIndex = index; // Guardamos el índice global de la imagen
        });
    });

    // Función para cambiar la imagen en el lightbox (navegación global)
    function showImage(direction) {
        currentImageIndex += direction;

        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        
        lightboxImage.src = imagesArray[currentImageIndex].src;
    }

    // Event listeners para las flechas del lightbox
    document.querySelector('.lightbox-nav.prev').addEventListener('click', () => showImage(-1));
    document.querySelector('.lightbox-nav.next').addEventListener('click', () => showImage(1));
    
    // Función para cerrar el lightbox
    function closeModal() {
        lightbox.classList.remove('active');
    }

    lightbox.querySelector('.close-btn').addEventListener('click', closeModal);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeModal();
    });
});