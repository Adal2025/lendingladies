document.addEventListener('DOMContentLoaded', function() {

  // --- LÓGICA DE CLICK PARA VOLTEAR TARJETAS (FLIP CARD) ---
    document.querySelectorAll('.sponsor-box').forEach(card => {
        card.addEventListener('click', function(event) {
            // Verifica si el clic fue directamente en el botón "Read their story"
            if (event.target.classList.contains('read-story-btn')) {
                // Si es el botón, deja que el enlace HTML haga la redirección y no voltees.
                return;
            }

            // Si el clic NO fue en el botón, voltea la tarjeta
            this.classList.toggle('is-flipped');
        });
    });

    // ... el resto de tu código JS (modales, sliders) ...

    // ... el resto de tu código JS ...
    
    // --- Selectores de Elementos ---
    const cardAboutUs = document.getElementById('card-about-us');
    const cardPastEvents = document.getElementById('card-past-events');
    const cardJoinList = document.getElementById('card-join-list');
    const cardSponsor = document.getElementById('card-sponsor');

    const simpleModal = document.getElementById('simpleModal');
    const formModal = document.getElementById('formModal');
    
    // Redefinimos simpleModalContent para trabajar con el contenido inyectado
    const simpleModalContent = document.querySelector('#simpleModal .modal-content');
    
    // NOTA: simpleModalHeader y simpleModalBody ya NO se usan para AboutUs/Sponsor
    // Ahora inyectamos todo el HTML complejo directamente en simpleModalContent
    
    // Función para CERRAR cualquier modal
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        // Limpiar contenido para modales dinámicos (opcional, pero buena práctica)
        if (modalElement === simpleModal) {
            simpleModalContent.innerHTML = ''; 
        }
    }

    // --- LÓGICA DE CIERRE DE MODALES ---

    // El botón 'X' estático (para el formModal)
    document.querySelectorAll('.close-btn').forEach(button => {
        button.onclick = function() {
            closeModal(button.closest('.modal'));
        };
    });

    // Cerrar haciendo clic fuera de la ventana
    window.onclick = function(event) {
        if (event.target === simpleModal || event.target === formModal) {
            closeModal(event.target);
        }
    };

    // --- LÓGICA DE CLIC EN LAS TARJETAS ---

    // Contenido HTML completo para el modal "About Us" (definido como una variable global)
    const aboutUsContentHTML = `
        <div class="about-us-content">
            <span class="close-btn">&times;</span>
            <h2 class="main-title-pink">About Us!</h2>
            <div class="content-section">
                <h4 class="section-title-pink">Born from Experience</h4>
                <p class="body-text">Born from firsthand experience in the lending and banking industry, our organization was created to bridge a gap that too often goes unnoticed.</p>
            </div>
            <div class="content-section">
                <h4 class="section-title-pink">A Spark of Realization</h4>
                <p class="body-text">When our co-founder, Priscilla, sought to refer clients to professionals better suited to their needs, she realized all her trusted contacts were men. That moment sparked a powerful realization: women in lending need stronger visibility, deeper connection, and greater representation.</p>
            </div>
            <div class="content-section">
                <h4 class="section-title-pink">Our Community</h4>
                <p class="body-text">We are a community built to elevate, support, and connect women across all areas of the lending world, including banking, mortgage, fintech, and beyond.</p>
            </div>
            <div class="content-section">
                <h4 class="section-title-pink">Our Goal</h4>
                <p class="body-text">By amplifying each other's voices and opening doors to new relationships, we aim to reshape the industry's future—one woman at a time.</p>
            </div>
            <p class="signature-text">— Priscilla Picasso and Liz Castillo</p>
        </div>
    `;

    // Caja 1: Abre Modal (About Us) - AHORA CON EL CÓDIGO COMPLEJO
    cardAboutUs.addEventListener('click', function() {
        // 1. Inyecta el HTML completo
        simpleModalContent.innerHTML = aboutUsContentHTML;
        simpleModal.style.display = 'block';

        // 2. 🚨 Reasigna el evento de cierre al nuevo botón "X" que se inyectó
        const newCloseBtn = simpleModalContent.querySelector('.close-btn');
        if (newCloseBtn) {
            newCloseBtn.onclick = function() {
                closeModal(simpleModal);
            };
        }
    });

    // Caja 2: Redirige a otra página (Past Events)
    cardPastEvents.addEventListener('click', function() {
        window.location.href = 'past-events.html'; 
    });

    // Caja 3: Abre Modal con Formulario (Join Our Email List)
    cardJoinList.addEventListener('click', function() {
        formModal.style.display = 'block';
    });

// Caja 4: Abre Modal (Become a Sponsor) - CORREGIDO Y ACTUALIZADO
cardSponsor.addEventListener('click', function() {
    // Definimos el nuevo contenido HTML con los textos y estilos solicitados.
    const sponsorContentHTML = `
        <span class="close-btn">&times;</span>
        <h3 id="modal-header" style="color: #E92D93; text-align: center;">Become a Sponsor</h3>
        <p id="modal-body" style="color: black; text-align: justify;">
            We offer a range of sponsorship levels from $250 to $500, designed to accommodate individuals, small businesses, and organizations that want to make a meaningful impact. Each level comes with recognition and benefits tailored to your support, including brand exposure, featured mentions, and opportunities to connect directly with our growing community.
        </p>
        <p style="text-align: center; margin-top: 20px;">
            Ready to partner with us? Email us at 
            <a href="mailto:lendingladiestx@gmail.com?subject=Sponsorship Inquiry for Lending Ladies TX" style="color: #E92D93; font-weight: bold;">
                lendingladiestx@gmail.com
            </a>
        </p>
    `;

    // 1. Inyectamos el nuevo contenido en el modal.
    simpleModalContent.innerHTML = sponsorContentHTML;
    simpleModal.style.display = 'block';

    // 2. Reasignamos el evento de cierre al nuevo botón 'X' que acabamos de crear.
    const newCloseBtn = simpleModalContent.querySelector('.close-btn');
    if (newCloseBtn) {
        newCloseBtn.onclick = function() {
            closeModal(simpleModal);
        };
    }
});

    // --- LÓGICA DE SLIDERS (Separada de la lógica de modales) ---
    
    // Array para rastrear la imagen actual de cada slider (0-indexado)
    let slideIndex = [0, 0, 0];
    const numSlides = 3;

    // Función para actualizar los puntos indicadores
    function updateDots(sliderId) {
        const dotsContainer = document.querySelector(`.slider-nav[data-slider="${sliderId}"] .slider-dots`);
        const dots = dotsContainer.querySelectorAll('.dot');
        const currentIndex = slideIndex[sliderId - 1];

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Función para ir a una diapositiva específica
    function goToSlide(sliderId, slideNumber) {
        slideIndex[sliderId - 1] = slideNumber;

        const sliderImages = document.querySelector(`#slider-${sliderId} .slider-images`);
        const offset = -slideIndex[sliderId - 1] * (100 / numSlides);
        sliderImages.style.transform = `translateX(${offset}%)`;

        updateDots(sliderId);
    }

    // Event Listeners para los botones de flecha
    document.querySelectorAll('.slider-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sliderId = parseInt(this.parentElement.dataset.slider);
            const direction = this.classList.contains('next') ? 1 : -1;
            
            let newIndex = slideIndex[sliderId - 1] + direction;

            if (newIndex >= numSlides) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = numSlides - 1;
            }
            
            goToSlide(sliderId, newIndex);
        });
    });

    // Event Listeners para los puntos
    document.querySelectorAll('.slider-dots .dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const sliderId = parseInt(this.closest('.slider-nav').dataset.slider);
            const slideToGo = parseInt(this.dataset.slideTo);
            goToSlide(sliderId, slideToGo);
        });
    });

    // Inicializar los puntos al cargar la página
    for (let i = 1; i <= 3; i++) {
        updateDots(i);
    }

});