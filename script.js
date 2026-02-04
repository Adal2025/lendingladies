document.addEventListener('DOMContentLoaded', function() {

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


    function setupForm(formId, submitLabel) {
        const form = document.getElementById(formId);
        if (!form) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const statusMessage = form.querySelector('.form-status');
        const recaptchaField = form.querySelector('.recaptcha-container');

        function setStatus(message, isError) {
            if (!statusMessage) return;
            statusMessage.textContent = message;
            statusMessage.style.color = isError ? '#b3261e' : '#0b6b2c';
        }

        function getWidgetId() {
            if (!recaptchaField) return null;
            const widgetId = recaptchaField.dataset.widgetId;
            return widgetId ? Number(widgetId) : null;
        }

        form.addEventListener('submit', async function(event) {
            if (recaptchaField) {
                if (typeof grecaptcha === 'undefined') {
                    event.preventDefault();
                    setStatus('reCAPTCHA is still loading. Please try again.', true);
                    return;
                }
                const widgetId = getWidgetId();
                const token = widgetId !== null ? grecaptcha.getResponse(widgetId) : '';
                if (!token) {
                    event.preventDefault();
                    setStatus('Please complete the reCAPTCHA.', true);
                    return;
                }
            }

            event.preventDefault();
            setStatus('');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    const widgetId = getWidgetId();
                    if (typeof grecaptcha !== 'undefined' && widgetId !== null) {
                        grecaptcha.reset(widgetId);
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
                    submitButton.textContent = submitLabel;
                }
            }
        });
    }

    setupForm('joinForm', 'Subscribe');
    setupForm('contactForm', 'Send Message');

    const recaptchaContainers = document.querySelectorAll('.recaptcha-container');
    if (recaptchaContainers.length) {
        window.onRecaptchaLoad = function() {
            const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            const siteKey = isLocalhost
                ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                : '6LfBrkosAAAAANnUG1DuVIYqNGfOCyyEprRYxT45';
            recaptchaContainers.forEach(container => {
                const widgetId = grecaptcha.render(container, { sitekey: siteKey });
                container.dataset.widgetId = widgetId;
            });
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

    if (cardAboutUs) {
        cardAboutUs.addEventListener('click', function() {
            openSimpleModal(aboutUsContentHTML);
        });
    }

    if (cardPastEvents) {
        cardPastEvents.addEventListener('click', function() {
            window.location.href = 'lending-ladies-events.html';
        });
    }

    if (cardJoinList) {
        cardJoinList.addEventListener('click', function() {
            openFormModal();
        });
    }

    if (btnNextEvent) {
        btnNextEvent.addEventListener('click', (event) => {
            event.preventDefault();
            openFormModal();
        });
    }

    if (navJoinUs) {
        navJoinUs.addEventListener('click', (event) => {
            event.preventDefault();
            openFormModal();
        });
    }

    document.querySelectorAll('a[href="#formModal"]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openFormModal();
        });
    });


    // Caja 4: Abre Modal (Become a Sponsor) - CORREGIDO Y ACTUALIZADO
    if (cardSponsor) {
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
    }

    if (btnLearnMore) {
        btnLearnMore.addEventListener('click', function() {
            openSimpleModal(aboutUsContentHTML);
        });
    }

    if (location.hash === '#formModal') {
        openFormModal();
    }


    if (btnViewEvents) {
        btnViewEvents.addEventListener('click', function() {
            window.location.href = 'lending-ladies-events.html';
        });
    }

    const cityTabs = document.querySelectorAll('.city-tab');
    const cityCards = document.querySelectorAll('.city-ticket-card');
    const cityPostImage = document.querySelector('.city-post-image');
    const cityPostTitle = document.querySelector('.city-post-title');
    const cityPostMonth = document.querySelector('.city-post-month');
    const cityPostDay = document.querySelector('.city-post-day');
    const cityPostYear = document.querySelector('.city-post-year');
    const cityPostAgenda = document.querySelector('.city-post-agenda');
    const cityPostTimes = document.querySelector('.city-post-times');
    const cityOrder = Array.from(cityTabs).map(tab => tab.dataset.city);

    function setActiveCity(city) {
        const activeTab = document.querySelector(`.city-tab[data-city="${city}"]`);
        const postImage = activeTab ? activeTab.dataset.post : '';
        const postAlt = activeTab ? activeTab.dataset.postAlt : '';
        const postTitle = activeTab ? activeTab.dataset.title : '';
        const postMonth = activeTab ? activeTab.dataset.month : '';
        const postDay = activeTab ? activeTab.dataset.day : '';
        const postYear = activeTab ? activeTab.dataset.year : '';
        const postAgenda = activeTab ? activeTab.dataset.agenda : '';
        const postTimes = activeTab ? activeTab.dataset.times : '';
        const activeIndex = cityOrder.indexOf(city);
        const leftIndex = (activeIndex - 1 + cityOrder.length) % cityOrder.length;
        const rightIndex = (activeIndex + 1) % cityOrder.length;

        cityTabs.forEach(tab => {
            const isActive = tab.dataset.city === city;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        cityCards.forEach(card => {
            const cardCity = card.dataset.city;
            card.classList.toggle('is-active', cardCity === cityOrder[activeIndex]);
            card.classList.toggle('is-left', cardCity === cityOrder[leftIndex]);
            card.classList.toggle('is-right', cardCity === cityOrder[rightIndex]);
        });

        if (cityPostImage && postImage) {
            cityPostImage.src = postImage;
            cityPostImage.alt = postAlt;
        }

        if (cityPostTitle && postTitle) {
            cityPostTitle.textContent = postTitle;
        }

        if (cityPostMonth && postMonth) {
            cityPostMonth.textContent = postMonth;
        }

        if (cityPostDay && postDay) {
            cityPostDay.textContent = postDay;
        }

        if (cityPostYear && postYear) {
            cityPostYear.textContent = postYear;
        }

        if (cityPostAgenda && postAgenda) {
            cityPostAgenda.innerHTML = postAgenda.split('|').map(item => `<li>${item}</li>`).join('');
        }

        if (cityPostTimes && postTimes) {
            cityPostTimes.innerHTML = postTimes.split('|').map(item => `<li>${item}</li>`).join('');
        }
    }

    if (cityTabs.length) {
        cityTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                setActiveCity(tab.dataset.city);
            });
        });
        cityCards.forEach(card => {
            card.addEventListener('click', () => {
                setActiveCity(card.dataset.city);
            });
        });
        setActiveCity(cityTabs[0].dataset.city);
    }

    if (btnMeetFounders) {
        btnMeetFounders.addEventListener('click', function() {
            openSimpleModal(aboutUsContentHTML);
        });
    }

});
