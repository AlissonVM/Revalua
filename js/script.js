document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Carrusel de Características ---
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.feature-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let slideIndex = 0;
    let slidesPerView = 3; // Por defecto para desktop

    const updateSlidesPerView = () => {
        if (window.innerWidth <= 768) {
            slidesPerView = 1; // 1 slide en móviles
        } else if (window.innerWidth <= 992) {
            slidesPerView = 2; // 2 slides en tablets
        } else {
            slidesPerView = 3; // 3 slides en desktop
        }
        // Llamar a updateCarousel para ajustar la posición después de cambiar slidesPerView
        updateCarousel();
    };

    const updateCarousel = () => {
        // Calcula el ancho de un slide incluyendo los márgenes
        const slideStyle = getComputedStyle(slides[0]);
        const slideMarginLeft = parseFloat(slideStyle.marginLeft);
        const slideMarginRight = parseFloat(slideStyle.marginRight);
        const slideWidthWithMargin = slides[0].offsetWidth + slideMarginLeft + slideMarginRight;

        // Asegura que slideIndex no exceda los límites
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        slideIndex = Math.min(slideIndex, maxIndex);

        carouselTrack.style.transform = `translateX(-${slideIndex * slideWidthWithMargin}px)`;

        // Control de visibilidad de los botones de navegación
        prevButton.style.display = slideIndex === 0 ? 'none' : 'block';
        nextButton.style.display = slideIndex >= maxIndex ? 'none' : 'block';
    };

    nextButton.addEventListener('click', () => {
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (slideIndex < maxIndex) {
            slideIndex++;
        } else {
            slideIndex = 0; // Vuelve al inicio si llega al final (loop)
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (slideIndex > 0) {
            slideIndex--;
        } else {
            slideIndex = maxIndex; // Vuelve al final si llega al inicio (loop)
        }
        updateCarousel();
    });

    // Ejecutar al cargar la página y al redimensionar
    updateSlidesPerView(); // Establece el valor inicial
    window.addEventListener('resize', updateSlidesPerView); // Actualiza al redimensionar
    // Forzar la primera actualización para asegurar que los botones estén bien al cargar
    setTimeout(updateCarousel, 100);


    // --- Lógica de Modales (Registro y Login) ---
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerCtaBtn = document.getElementById('registerCtaBtn'); // Botón "Regístrate ahora" en beneficios
    const finalCtaBtn = document.getElementById('finalCtaBtn'); // Botón "Empieza Hoy Mismo" al final

    const closeButtons = document.querySelectorAll('.modal .close-button');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    const openLoginFromRegister = document.getElementById('openLoginFromRegister');
    const openRegisterFromLogin = document.getElementById('openRegisterFromLogin');

    // Función para abrir modal
    const openModal = (modal) => {
        modal.style.display = 'flex'; // Usamos flex para centrar
        document.body.classList.add('modal-open'); // Para evitar scroll en el body
    };

    // Función para cerrar modal
    const closeModal = (modal) => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    };

    // Eventos para abrir modales
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });

    // Estos CTA también abrirán el registro
    registerCtaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });

    finalCtaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });


    // Eventos para cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            closeModal(registerModal);
        }
        if (e.target === loginModal) {
            closeModal(loginModal);
        }
    });

    // Cambiar entre modales desde los enlaces "Ya tienes cuenta" / "No tienes cuenta"
    openLoginFromRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });

    openRegisterFromLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });


    // --- Simulación de Registro ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;
        const regConfirmPassword = document.getElementById('regConfirmPassword').value;
        const userType = document.getElementById('userType').value;

        if (regPassword !== regConfirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        if (regEmail && regPassword && userType) {
            alert(`¡Registro exitoso para ${regEmail} como ${userType === 'seller' ? 'Vendedor' : 'Comprador'}! Te estamos redirigiendo...`);
            closeModal(registerModal);
            // Simular redirección al dashboard (lo manejamos en el login)
            // En un proyecto real, aquí se enviarían los datos al servidor y se manejaría la respuesta.
            // Por ahora, solo cerramos el modal y se le pedirá iniciar sesión.
            openModal(loginModal); // Tras registrarse, se le pide iniciar sesión
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // --- Simulación de Inicio de Sesión ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Simulación de credenciales válidas
        if (loginEmail === 'empresa@ejemplo.com' && loginPassword === 'password123') {
            alert('¡Inicio de sesión exitoso! Redirigiendo a tu panel...');
            closeModal(loginModal);
            // Redirigir a la página del dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Correo o contraseña incorrectos. Inténtalo de nuevo. (Usar: empresa@ejemplo.com / password123)');
        }
    });
});

// Añade esta clase al body cuando un modal esté abierto para evitar scroll
document.body.classList.remove('modal-open'); // Asegúrate que no esté al cargar
