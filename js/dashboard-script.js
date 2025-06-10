document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.dashboard-grid .sidebar ul li');
    const mainContent = document.querySelector('.dashboard-grid .main-content');
    const logoutBtn = document.getElementById('logoutBtn');

    // Función para cargar el contenido dinámico del dashboard
    const loadDashboardContent = (section) => {
        let contentHtml = '';

        switch (section) {
            case 'home':
                contentHtml = `
                    <h3>¡Bienvenido, Empresa de Telecomunicaciones!</h3>
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
            case 'my-equipment':
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
            case 'esg-reports':
                contentHtml = `
                    <h3>Reportes de Sostenibilidad (ESG)</h3>
                    <p>Descarga tus informes de impacto ambiental y retorno de inversión.</p>
                    <div class="report-links">
                        <a href="#" class="button-secondary btn-small"><i class="fas fa-file-pdf"></i> Reporte Anual ESG 2024</a>
                        <a href="#" class="button-secondary btn-small"><i class="fas fa-chart-pie"></i> Análisis de Huella de Carbono</a>
                    </div>
                `;
                break;
            case 'my-sales':
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
            case 'settings':
                contentHtml = `
                    <h3>Configuración de Cuenta</h3>
                    <p>Gestiona los detalles de tu empresa, notificaciones y métodos de pago.</p>
                    <form class="mock-form">
                        <label for="companyName">Nombre de la Empresa:</label>
                        <input type="text" id="companyName" value="Empresa de Telecomunicaciones S.A.">
                        <label for="email">Email de Contacto:</label>
                        <input type="email" id="email" value="contacto@telecom.com">
                        <button type="submit" class="button-primary btn-small">Guardar Cambios</button>
                    </form>
                `;
                break;
            default:
                contentHtml = `<h3>Contenido no disponible.</h3>`;
        }
        mainContent.innerHTML = contentHtml;
    };

    // Eventos para cambiar contenido del sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadDashboardContent(item.dataset.content);
        });
    });

    // Simular el cierre de sesión
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Sesión cerrada. Redirigiendo a la página de inicio...');
        window.location.href = 'index.html'; // Redirige de vuelta a la página de inicio
    });

    // Cargar el contenido de "Inicio" por defecto al entrar al dashboard
    loadDashboardContent('home');
});
