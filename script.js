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
    const btnNextEvent = document.getElementById('btn-next-event');
    const btnLearnMore = document.getElementById('btn-learn-more');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navJoinUs = document.querySelector('.nav-cta');
    const btnViewEvents = document.getElementById('btn-view-events');
    const btnGetInTouch = document.getElementById('btn-get-in-touch');
    const btnMeetFounders = document.getElementById('btn-meet-founders');

    // --- Lógica de menú móvil ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const simpleModal = document.getElementById('simpleModal');
    const formModal = document.getElementById('formModal');
    
    const simpleModalContent = document.querySelector('#simpleModal .modal-content');

    function openSimpleModal(contentHTML) {
        if (!simpleModal || !simpleModalContent) return;
        simpleModalContent.innerHTML = contentHTML;
        simpleModal.style.display = 'flex';

        const newCloseBtn = simpleModalContent.querySelector('.close-btn');
        if (newCloseBtn) {
            newCloseBtn.onclick = function() {
                closeModal(simpleModal);
            };
        }
    }

    function openFormModal() {
        if (formModal) {
            formModal.style.display = 'flex';
        }
    }

    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        const submitButton = joinForm.querySelector('button[type="submit"]');
        const statusMessage = joinForm.querySelector('.form-status');

        function setStatus(message, isError) {
            if (!statusMessage) return;
            statusMessage.textContent = message;
            statusMessage.style.color = isError ? '#b3261e' : '#0b6b2c';
        }

        joinForm.addEventListener('submit', async function(event) {
            if (typeof grecaptcha === 'undefined') {
                return;
            }
            if (!grecaptcha.getResponse()) {
                event.preventDefault();
                setStatus('Please complete the reCAPTCHA.', true);
                return;
            }
            event.preventDefault();
            setStatus('');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                const response = await fetch(joinForm.action, {
                    method: 'POST',
                    body: new FormData(joinForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    joinForm.reset();
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }
                    setStatus('Thanks! Your message was sent successfully.', false);
                } else {
                    setStatus('Something went wrong. Please try again.', true);
                }
            } catch (error) {
                setStatus('Unable to send right now. Please try again later.', true);
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                }
            }
        });
    }

    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer) {
        window.onRecaptchaLoad = function() {
            const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            const siteKey = isLocalhost
                ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                : '6LfBrkosAAAAANnUG1DuVIYqNGfOCyyEprRYxT45';
            grecaptcha.render(recaptchaContainer, { sitekey: siteKey });
        };
    }
    
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
        openSimpleModal(aboutUsContentHTML);
    });

    cardPastEvents.addEventListener('click', function() {
        window.location.href = 'past-events.html'; 
    });

    cardJoinList.addEventListener('click', function() {
        openFormModal();
    });

    if (btnNextEvent) {
        btnNextEvent.addEventListener('click', openFormModal);
    }

    if (btnGetInTouch) {
        btnGetInTouch.addEventListener('click', openFormModal);
    }

    if (navJoinUs) {
        navJoinUs.addEventListener('click', function(event) {
            event.preventDefault();
            openFormModal();
        });
    }

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
    openSimpleModal(sponsorContentHTML);
});

    if (btnLearnMore) {
        btnLearnMore.addEventListener('click', function() {
            openSimpleModal(aboutUsContentHTML);
        });
    }

    if (btnViewEvents) {
        btnViewEvents.addEventListener('click', function() {
            window.location.href = 'past-events.html';
        });
    }

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

    const cityTabs = document.querySelectorAll('.city-tab');
    const cityCards = document.querySelectorAll('.city-event-card');
    const cityImage = document.querySelector('.city-tabs-image');

    function setActiveCity(city) {
        const activeTab = document.querySelector(`.city-tab[data-city="${city}"]`);
        const tabImage = activeTab ? activeTab.dataset.image : '';
        const tabAlt = activeTab ? activeTab.dataset.alt : '';

        cityTabs.forEach(tab => {
            const isActive = tab.dataset.city === city;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        cityCards.forEach(card => {
            card.hidden = card.dataset.city !== city;
        });

        if (cityImage && tabImage) {
            cityImage.src = tabImage;
            cityImage.alt = tabAlt;
        }
    }

    if (cityTabs.length) {
        cityTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                setActiveCity(tab.dataset.city);
            });
        });
    }

}); // <-- ESTA ES LA ÚNICA LLAVE DE CIERRE QUE DEBE HABER AL FINAL
    if (btnMeetFounders) {
        btnMeetFounders.addEventListener('click', function() {
            openSimpleModal(aboutUsContentHTML);
        });
    }
