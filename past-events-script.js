document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DEL SLIDER (SIN CAMBIOS) ---
    let sliderIndex = 0;
    const slidesContainer = document.querySelector('.slider-images');
    const totalSlides = 3; 

    function moveSlide(direction) {
        sliderIndex = (sliderIndex + direction + totalSlides) % totalSlides;
        const offset = -sliderIndex * (100 / totalSlides);
        slidesContainer.style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.nav-btn.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.nav-btn.next').addEventListener('click', () => moveSlide(1));

    
    // --- LÓGICA DEL LIGHTBOX (ACTUALIZADA CON NAVEGACIÓN) ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const sliderImages = document.querySelectorAll('.slider-img');
    let currentImageIndex;

    // Convertimos la colección de imágenes a un Array para poder buscar su índice
    const imagesArray = Array.from(sliderImages);

    imagesArray.forEach((image, index) => {
        image.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImage.src = this.src;
            currentImageIndex = index; // Guardamos el índice de la imagen abierta
        });
    });

    // Función para cambiar la imagen en el lightbox
    function showImage(direction) {
        currentImageIndex += direction;

        // Lógica para que la navegación sea cíclica
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        
        // Cambiamos la imagen que se muestra
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