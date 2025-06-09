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

    // Función para actualizar slidesPerView basada en el tamaño de la ventana
    const updateSlidesPerView = () => {
        if (window.innerWidth <= 768) {
            slidesPerView = 1; // 1 slide en móviles
        } else if (window.innerWidth <= 992) {
            slidesPerView = 2; // 2 slides en tablets
        } else {
            slidesPerView = 3; // 3 slides en desktop
        }
        updateCarousel(); // Actualiza la vista del carrusel si cambia slidesPerView
    };

    const updateCarousel = () => {
        const slideWidth = slides[0].offsetWidth + (parseFloat(getComputedStyle(slides[0]).marginLeft) * 2);
        carouselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

        // Control de botones de navegación (opcional, para loop infinito o límites)
        // Si no es un loop, ocultar/deshabilitar botones al inicio/fin
        prevButton.style.display = slideIndex === 0 ? 'none' : 'block';
        nextButton.style.display = slideIndex >= (slides.length - slidesPerView) ? 'none' : 'block';
    };

    nextButton.addEventListener('click', () => {
        if (slideIndex < (slides.length - slidesPerView)) {
            slideIndex++;
        } else {
            slideIndex = 0; // Vuelve al inicio para un loop simple
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        if (slideIndex > 0) {
            slideIndex--;
        } else {
            slideIndex = slides.length - slidesPerView; // Vuelve al final para un loop simple
            if (slideIndex < 0) slideIndex = 0; // Asegura que no sea negativo si hay pocos slides
        }
        updateCarousel();
    });

    // Ejecutar al cargar la página y al redimensionar
    updateSlidesPerView(); // Establece el valor inicial
    window.addEventListener('resize', () => {
        updateSlidesPerView();
        updateCarousel(); // Vuelve a centrar el carrusel en caso de redimensionamiento
    });
    // Forzar la primera actualización para asegurar que los botones estén bien al cargar
    setTimeout(updateCarousel, 100);


    // --- Simulación de interacción en el Dashboard Preview ---
    const sidebarItems = document.querySelectorAll('.dashboard-mockup .sidebar ul li');
    const mainContent = document.querySelector('.dashboard-mockup .main-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remueve la clase 'active' de todos los elementos
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Añade la clase 'active' al elemento clickeado
            item.classList.add('active');

            // Simula cambio de contenido (muy básico, en un proyecto real se cargaría dinámicamente)
            const section = item.textContent.trim();
            let contentHtml = '';

            switch (section) {
                case 'Inicio':
                    contentHtml = `
                        <h3>¡Bienvenido, [Nombre de Empresa]!</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <i class="fas fa-dollar-sign"></i>
                                <h4>Ingresos Generados</h4>
                                <p>$25,000 USD</p>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-recycle"></i>
                                <h4>Equipos Revalorizados</h4>
                                <p>400 unidades</p>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-cloud-sun"></i>
                                <h4>CO2 Evitado</h4>
                                <p>15 toneladas</p>
                            </div>
                        </div>
                        <div class="latest-activity">
                            <h4>Actividad Reciente</h4>
                            <ul>
                                <li>Laptop Dell XPS 15 vendida en subasta. <strong>+ $800</strong></li>
                                <li>Solicitud de evaluación para 50 monitores.</li>
                                <li>Impresora HP LaserJet 1020 en revisión técnica.</li>
                            </ul>
                        </div>
                    `;
                    break;
                case 'Mis Equipos':
                    contentHtml = `
                        <h3>Mis Equipos Publicados</h3>
                        <p>Aquí verías un listado de todos tus equipos activos y en proceso de venta.</p>
                        <ul class="simple-list">
                            <li><i class="fas fa-laptop"></i> Laptop Lenovo T480 (En Subasta)</li>
                            <li><i class="fas fa-print"></i> 2 Impresoras Epson L3110 (Pendiente de Evaluación)</li>
                            <li><i class="fas fa-tablet-alt"></i> 10 Tablets Samsung (Vendido)</li>
                        </ul>
                        <button class="button-primary btn-small" style="margin-top: 20px;">+ Añadir Nuevo Equipo</button>
                    `;
                    break;
                case 'Reportes ESG':
                    contentHtml = `
                        <h3>Reportes de Sostenibilidad (ESG)</h3>
                        <p>Descarga tus informes de impacto ambiental y retorno de inversión.</p>
                        <div class="report-links">
                            <a href="#" class="button-secondary btn-small"><i class="fas fa-file-pdf"></i> Reporte Anual ESG 2024</a>
                            <a href="#" class="button-secondary btn-small"><i class="fas fa-chart-pie"></i> Análisis de Huella de Carbono</a>
                        </div>
                    `;
                    break;
                case 'Mis Ventas':
                    contentHtml = `
                        <h3>Historial de Ventas</h3>
                        <p>Consulta tus ventas completadas y en proceso.</p>
                        <table class="mock-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Venta</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Laptop Dell XPS 15</td>
                                    <td>$800</td>
                                    <td>2025-05-10</td>
                                    <td>Completada</td>
                                </tr>
                                <tr>
                                    <td>Impresora HP</td>
                                    <td>$120</td>
                                    <td>2025-04-22</td>
                                    <td>Completada</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                    break;
                case 'Configuración':
                    contentHtml = `
                        <h3>Configuración de Cuenta</h3>
                        <p>Gestiona los detalles de tu empresa, notificaciones y métodos de pago.</p>
                        <form class="mock-form">
                            <label for="companyName">Nombre de la Empresa:</label>
                            <input type="text" id="companyName" value="[Tu Empresa S.A.]">
                            <label for="email">Email de Contacto:</label>
                            <input type="email" id="email" value="contacto@[tuempresa].com">
                            <button type="submit" class="button-primary btn-small">Guardar Cambios</button>
                        </form>
                    `;
                    break;
                default:
                    contentHtml = `<h3>Contenido no disponible para ${section}</h3>`;
            }
            mainContent.innerHTML = contentHtml;
        });
    });

    // Trigger initial load for Dashboard Preview
    sidebarItems[0].click(); // Simula un clic en "Inicio" al cargar

    // --- Imágenes para productos (simulación) ---
    // Puedes cargar estas imágenes si no existen
    // [Image of a modern laptop] (for product-laptop.jpg)
    // [Image of a computer monitor] (for product-monitor.jpg)
    // [Image of a desktop printer] (for product-printer.jpg)

});
