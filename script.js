document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE CLICK PARA VOLTEAR TARJETAS (FLIP CARD) ---
    document.querySelectorAll('.sponsor-box').forEach(card => {
        card.addEventListener('click', function(event) {
            if (event.target.classList.contains('read-story-btn')) {
                return;
            }
            this.classList.toggle('is-flipped');
        });
    });

    // --- Selectores de Elementos ---
    const cardAboutUs = document.getElementById('card-about-us');
    const cardPastEvents = document.getElementById('card-past-events');
    const cardJoinList = document.getElementById('card-join-list');
    const cardSponsor = document.getElementById('card-sponsor');

    const simpleModal = document.getElementById('simpleModal');
    const formModal = document.getElementById('formModal');
    
    const simpleModalContent = document.querySelector('#simpleModal .modal-content');
    
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        if (modalElement === simpleModal) {
            simpleModalContent.innerHTML = ''; 
        }
    }

    // --- LÓGICA DE CIERRE DE MODALES ---
    document.querySelectorAll('.close-btn').forEach(button => {
        button.onclick = function() {
            closeModal(button.closest('.modal'));
        };
    });

    window.onclick = function(event) {
        if (event.target === simpleModal || event.target === formModal) {
            closeModal(event.target);
        }
    };

    // Contenido HTML completo para el modal "About Us"
const aboutUsContentHTML = `
    <span class="close-btn">&times;</span>
    <h2 class="about-us-main-title">About Us!</h2>
    
    <div class="about-us-section">
        <h4 class="about-us-subtitle">Born from Experience</h4>
        <p class="about-us-body">Born from firsthand experience in the lending and banking industry, our organization was created to bridge a gap that too often goes unnoticed.</p>
    </div>
    
    <div class="about-us-section">
        <h4 class="about-us-subtitle">A Spark of Realization</h4>
        <p class="about-us-body">When our co-founder, Priscilla, sought to refer clients to professionals better suited to their needs, she realized all her trusted contacts were men. That moment sparked a powerful realization: women in lending need stronger visibility, deeper connection, and greater representation.</p>
    </div>
    
    <div class="about-us-section">
        <h4 class="about-us-subtitle">Our Community</h4>
        <p class="about-us-body">We are a community built to elevate, support, and connect women across all areas of the lending world, including banking, mortgage, fintech, and beyond.</p>
    </div>
    
    <div class="about-us-section">
        <h4 class="about-us-subtitle">Our Goal</h4>
        <p class="about-us-body">By amplifying each other's voices and opening doors to new relationships, we aim to reshape the industry's future—one woman at a time.</p>
    </div>
    
    <p class="about-us-signature">— Priscilla Picasso and Liz Castillo</p>
`;

    cardAboutUs.addEventListener('click', function() {
        simpleModalContent.innerHTML = aboutUsContentHTML;
        simpleModal.style.display = 'flex';

        const newCloseBtn = simpleModalContent.querySelector('.close-btn');
        if (newCloseBtn) {
            newCloseBtn.onclick = function() {
                closeModal(simpleModal);
            };
        }
    });

    cardPastEvents.addEventListener('click', function() {
        window.location.href = 'past-events.html'; 
    });

    cardJoinList.addEventListener('click', function() {
        formModal.style.display = 'flex';
    });

    // Caja 4: Abre Modal (Become a Sponsor) - CORREGIDO Y ACTUALIZADO
cardSponsor.addEventListener('click', function() {
    // Definimos el nuevo contenido HTML con clases para darle estilo
    const sponsorContentHTML = `
        <span class="close-btn">&times;</span>
        <h2 class="sponsor-main-title">Become a Sponsor!</h2>
        
        <p class="sponsor-body">
            We offer a range of sponsorship levels from $250 to $500, designed to accommodate individuals, small businesses, and organizations that want to make a meaningful impact.
        </p>
        
        <p class="sponsor-body contact-line">
            Ready to partner with us? Email us at 
            <a href="mailto:lendingladiestx@gmail.com?subject=Inquiry About Sponsorship Opportunities" class="sponsor-email-link">
                lendingladiestx@gmail.com
            </a>
        </p>
    `;

    // 1. Inyectamos el nuevo contenido en el modal.
    simpleModalContent.innerHTML = sponsorContentHTML;
    simpleModal.style.display = 'flex'; // Usamos flex para centrar

    // 2. Reasignamos el evento de cierre al nuevo botón 'X' que acabamos de crear.
    const newCloseBtn = simpleModalContent.querySelector('.close-btn');
    if (newCloseBtn) {
        newCloseBtn.onclick = function() {
            closeModal(simpleModal);
        };
    }
});

// --- LÓGICA DE SLIDERS ---
    let slideIndex = [0, 0, 0];
    const numSlides = 3;

    function updateDots(sliderId) {
        const dotsContainer = document.querySelector(`.slider-nav[data-slider="${sliderId}"] .slider-dots`);
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.dot');
        const currentIndex = slideIndex[sliderId - 1];
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(sliderId, slideNumber) {
        const sliderImages = document.querySelector(`#slider-${sliderId} .slider-images`);
        if (!sliderImages) return;
        slideIndex[sliderId - 1] = slideNumber;
        const offset = -slideNumber * (100 / numSlides);
        sliderImages.style.transform = `translateX(${offset}%)`;
        updateDots(sliderId);
    }

    document.querySelectorAll('.slider-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sliderId = parseInt(this.parentElement.dataset.slider);
            const direction = this.classList.contains('next') ? 1 : -1;
            let newIndex = (slideIndex[sliderId - 1] + direction + numSlides) % numSlides;
            goToSlide(sliderId, newIndex);
        });
    });

    document.querySelectorAll('.slider-dots .dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const sliderId = parseInt(this.closest('.slider-nav').dataset.slider);
            const slideToGo = parseInt(this.dataset.slideTo);
            goToSlide(sliderId, slideToGo);
        });
    });

    // Inicializar los puntos al cargar la página
    for (let i = 1; i <= 3; i++) {
        if(document.querySelector(`.slider-nav[data-slider="${i}"]`)){
             updateDots(i);
        }
    }

    // --- LÓGICA PARA EL LIGHTBOX DE LA SECCIÓN RSVP ---
    // (Ahora está dentro del addEventListener principal y correcto)
    const rsvpImage = document.querySelector('.event-image-clickable');
    const rsvpLightbox = document.getElementById('rsvp-lightbox');
    const rsvpLightboxImg = document.getElementById('rsvp-lightbox-img');

    if (rsvpImage && rsvpLightbox && rsvpLightboxImg) {
        rsvpImage.addEventListener('click', () => {
            rsvpLightboxImg.src = rsvpImage.src;
            rsvpLightbox.classList.add('active');
        });

        rsvpLightbox.querySelector('.close-btn').addEventListener('click', () => {
            rsvpLightbox.classList.remove('active');
        });

        rsvpLightbox.addEventListener('click', (event) => {
            if (event.target === rsvpLightbox) {
                rsvpLightbox.classList.remove('active');
            }
        });
    }

}); // <-- ESTA ES LA ÚNICA LLAVE DE CIERRE QUE DEBE HABER AL FINAL