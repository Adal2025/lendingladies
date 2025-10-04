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

    // --- LÓGICA DE CLIC EN LAS TARJETAS ---
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

    cardAboutUs.addEventListener('click', function() {
        simpleModalContent.innerHTML = aboutUsContentHTML;
        simpleModal.style.display = 'block';

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
        formModal.style.display = 'block';
    });

    cardSponsor.addEventListener('click', function() {
        const sponsorContentHTML = `
            <span class="close-btn">&times;</span>
            <h3 id="modal-header" style="color: #E92D93; text-align: center;">Become a Sponsor</h3>
            <p style="color: black; text-align: justify;">
                We offer a range of sponsorship levels from $250 to $500, designed to accommodate individuals, small businesses, and organizations that want to make a meaningful impact.
            </p>
            <p style="color: black; text-align: justify;">
                Each level comes with recognition and benefits tailored to your support, including brand exposure, featured mentions, and opportunities to connect directly with our growing community.
            </p>
            <p style="text-align: center; margin-top: 20px;">
                Ready to partner with us? Email us at 
                <a href="mailto:lendingladiestx@gmail.com?subject=Sponsorship Inquiry for Lending Ladies TX" style="color: #E92D93; font-weight: bold;">
                    lendingladiestx@gmail.com
                </a>
            </p>
        `;

        simpleModalContent.innerHTML = sponsorContentHTML;
        simpleModal.style.display = 'block';

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
        const dots = dotsContainer.querySelectorAll('.dot');
        const currentIndex = slideIndex[sliderId - 1];
        if (!dotsContainer) return; // Si no hay dots, no hagas nada
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(sliderId, slideNumber) {
        slideIndex[sliderId - 1] = slideNumber;
        const sliderImages = document.querySelector(`#slider-${sliderId} .slider-images`);
        if (!sliderImages) return; // Si no hay slider, no hagas nada
        const offset = -slideIndex[sliderId - 1] * (100 / numSlides);
        sliderImages.style.transform = `translateX(${offset}%)`;
        updateDots(sliderId);
    }

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

    document.querySelectorAll('.slider-dots .dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const sliderId = parseInt(this.closest('.slider-nav').dataset.slider);
            const slideToGo = parseInt(this.dataset.slideTo);
            goToSlide(sliderId, slideToGo);
        });
    });

    for (let i = 1; i <= 3; i++) {
        updateDots(i);
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