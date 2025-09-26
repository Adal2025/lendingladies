document.addEventListener('DOMContentLoaded', function() {
    
    // --- Selectores de Elementos ---
    const cardAboutUs = document.getElementById('card-about-us');
    const cardPastEvents = document.getElementById('card-past-events');
    const cardJoinList = document.getElementById('card-join-list');
    const cardSponsor = document.getElementById('card-sponsor');

    const simpleModal = document.getElementById('simpleModal');
    const formModal = document.getElementById('formModal');
    
    const simpleModalHeader = document.getElementById('modal-header');
    const simpleModalBody = document.getElementById('modal-body');

    // Función para CERRAR cualquier modal
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
    }

    // --- LÓGICA DE CIERRE DE MODALES ---

    // Cerrar con el botón X
    document.querySelectorAll('.close-btn').forEach(button => {
        button.onclick = function() {
            closeModal(button.closest('.modal'));
        };
    });

    // Cerrar haciendo clic fuera de la ventana
    window.onclick = function(event) {
        if (event.target == simpleModal) {
            closeModal(simpleModal);
        }
        if (event.target == formModal) {
            closeModal(formModal);
        }
    };

    // --- LÓGICA DE CLIC EN LAS TARJETAS ---

    // Caja 1: Abre Modal (About Us)
    cardAboutUs.addEventListener('click', function() {
        simpleModalHeader.textContent = 'Acerca de Nosotros';
        simpleModalBody.textContent = 'Lending Ladies es la organización #1 para mujeres en la industria de préstamos, enfocada en networking y crecimiento profesional.';
        simpleModal.style.display = 'block';
    });

    // Caja 2: Redirige a otra página (Past Events)
    cardPastEvents.addEventListener('click', function() {
        // Redirección a una URL ficticia. Cámbiala por la real.
        window.location.href = 'past-events.html'; 
    });

    // Caja 3: Abre Modal con Formulario (Join Our Email List)
    cardJoinList.addEventListener('click', function() {
        formModal.style.display = 'block';
    });

    // Caja 4: Abre Modal (Become a Sponsor)
    cardSponsor.addEventListener('click', function() {
        simpleModalHeader.textContent = '¡Patrocina nuestro próximo evento!';
        simpleModalBody.textContent = 'Contáctanos para conocer nuestros paquetes de patrocinio y cómo puedes apoyar a nuestra comunidad.';
        simpleModal.style.display = 'block';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Array para rastrear la imagen actual de cada slider (0-indexado)
    // index[0] para slider-1, index[1] para slider-2, index[2] para slider-3
    let slideIndex = [0, 0, 0]; 
    const numSlides = 3; // Número de imágenes en cada slider

    // Función para mover un slider específico
    function moveSlide(sliderId, direction) {
        // Obtener el índice del array basado en el ID del slider (1, 2 o 3)
        const index = sliderId - 1; 

        // 1. Calcular el nuevo índice (asegura que el slider da la vuelta)
        slideIndex[index] += direction;
        
        if (slideIndex[index] >= numSlides) {
            slideIndex[index] = 0; // Volver a la primera imagen
        }
        if (slideIndex[index] < 0) {
            slideIndex[index] = numSlides - 1; // Ir a la última imagen
        }

        // 2. Aplicar la transformación CSS para mostrar la imagen correcta
        const sliderImages = document.querySelector(`#slider-${sliderId} .slider-images`);
        
        // Mover el contenedor de las imágenes con translateX
        // Cada imagen es el 33.33% (100% / 3) del contenedor, por lo que se mueve en múltiplos de -33.33%
        const offset = -slideIndex[index] * (100 / numSlides);
        sliderImages.style.transform = `translateX(${offset}%)`;
    }

    // --- Configurar Event Listeners para todos los botones ---
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            // data-slider es 1, 2 o 3
            const sliderId = parseInt(this.dataset.slider);
            
            // Si tiene la clase 'next', la dirección es 1. Si es 'prev', es -1.
            const direction = this.classList.contains('next') ? 1 : -1;
            
            moveSlide(sliderId, direction);
        });
    });
});