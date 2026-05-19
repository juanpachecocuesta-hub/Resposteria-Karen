// ============================================
// Repostería Karen - JavaScript
// ============================================
// Este archivo agrega funcionalidad interactiva a la página

// ============================================
// 1. EFECTO DE NAVBAR AL HACER SCROLL
// ============================================
// Cuando el usuario baja, el navbar se fija arriba con un estilo diferente

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // Si scrolles mayor a 50px, agregamos clase scrolled
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ============================================
// 2. MENÚ HAMBURGUESA PARA MÓVIL
// ============================================
// Agrega un botón de menú que se muestra solo en celulares

// Crear el botón de hamburguesa
const navbar = document.querySelector('.navbar');
const navbarMenu = document.querySelector('.navbar-menu');

// Crear botón hamburguesa
const hamburger = document.createElement('button');
hamburger.className = 'hamburger';
hamburger.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
`;
hamburger.setAttribute('aria-label', 'Abrir menú');

// Insertar después del brand
const navbarBrand = document.querySelector('.navbar-brand');
navbar.insertBefore(hamburger, navbarBrand.nextSibling);

// Evento click para abrir/cerrar menú
hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú cuando se hace click en un enlace
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


// ============================================
// 3. ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ============================================
// Los elementos aparecen cuando se hacen visibles al hacer scroll

// Esta función crea el observador que vigila cuando los elementos entran en pantalla
const observerOptions = {
    threshold: 0.1, // Cuando se ve el 10% del elemento
    rootMargin: '0px 0px -50px 0px' // Un poco antes del fondo
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Dejar de observar una vez que se mostró
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos que queremos animatear
const animateElements = document.querySelectorAll('.feature-card, .product_card, .contact-option');

animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});


// ============================================
// 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ============================================
// Valida que los campos estén llenos y muestra mensaje de éxito

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Agregar clase de error visual cuando el campo no es válido
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Cuando el campo pierde el foco, validar si está vacío
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
        
        // Quitar el error cuando el usuario empieza a escribir
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se envíe realmente (recargue la página)

        // Obtener los valores del formulario usando los IDs que agregamos
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación: todos los campos deben estar llenos
        if (!nombre || !telefono || !email || !mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Validación de email (contiene @ y dominio)
        if (!email.includes('@') || !email.includes('.')) {
            alert('Por favor, ingresa un email válido.');
            return;
        }

        // Validación de teléfono (mínimo 7 dígitos)
        if (telefono.replace(/\D/g, '').length < 7) {
            alert('Por favor, ingresa un número de teléfono válido.');
            return;
        }

        // Si todo está bien, mostrar mensaje de éxito
        // NOTA: En un caso real, esto enviaría los datos a un servidor
        alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Nos contactaremos pronto a ${telefono} o ${email}.`);

        // Limpiar el formulario
        contactForm.reset();
    });
}


// ============================================
// 5. EFECTO EN LOS BOTONES DE PRODUCTOS
// ============================================
// Agrega una acción cuando alguien hace click en "Pedir"
// Envía un mensaje a WhatsApp con el nombre del producto

const productButtons = document.querySelectorAll('.product_button');

productButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Obtener el nombre del producto desde la tarjeta
        const productCard = this.closest('.product_card');
        const productName = productCard.querySelector('.product_name').textContent;
        
        // Guardar el texto original del botón
        const textoOriginal = this.textContent;
        
        // Mostrar feedback visual: cambiar a "Enviando..."
        this.textContent = 'Enviando...';
        this.disabled = true;
        
        // Crear mensaje para WhatsApp
        const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${productName}`);
        
        // Abrir WhatsApp con el mensaje
        // IMPORTANTE: Cambia el número al real de la negocio
        window.open(`https://wa.me/573001234567?text=${mensaje}`, '_blank');
        
        // Restaurar el botón después de 2 segundos
        setTimeout(() => {
            this.textContent = textoOriginal;
            this.disabled = false;
        }, 2000);
    });
});


// ============================================
// 6. BOTONES DE LA SECCIÓN HERO
// ============================================
// Agregar función a los botones del Hero

const btnPrimary = document.querySelector('.btn-primary');
const btnSecondary = document.querySelector('.btn-secondary');

if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        // Scroll suave a la sección de productos
        document.querySelector('#personalizadas').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
        // Scroll suave a la sección de contacto
        document.querySelector('#contacto').scrollIntoView({
            behavior: 'smooth'
        });
    });
}


// ============================================
// 7. MEJORAR LA EXPERIENCIA EN MÓVIL
// ============================================
// Ajustar el viewport height para dispositivos móviles

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


console.log('✅ Repostería Karen - JavaScript cargado correctamente');


// ============================================
// 8. SLIDER DEL HERO
// ============================================
// Carrusel automático de imágenes en el hero

let currentSlide = 0;
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remover clase active de todos los slides y dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Asegurar que el índice esté en rango
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    // Agregar clase active al slide y dot actual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto cambio cada 4 segundos
if (slides.length > 0) {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
}


// ============================================
// 9. PARTÍCULAS FLOTANTES (CONFETI/BURBUJAS)
// ============================================
// Crea partículas que flotan suavemente en el hero

const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    const particleColors = ['#f65b8a', '#ff7fa8', '#f9c8d3', '#ffe3ea', '#ffd6e5'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio entre 5px y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Color aleatorio
        particle.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        // Posición horizontal aleatoria
        particle.style.left = Math.random() * 100 + '%';
        
        // Animación aleatoria
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);       
    }
}


// ============================================
// 10. AÑO DINÁMICO DEL COPYRIGHT
// ============================================
// Actualiza automáticamente el año en el footer

const footerBottom = document.querySelector('.footer-bottom p');

if (footerBottom) {
    const currentYear = new Date().getFullYear();
    footerBottom.textContent = `© ${currentYear} Repostería Karen • Todos los derechos reservados`;
}


// ============================================
// 11. FOOTER DINÁMICO (Evita código duplicado)
// ============================================
// Genera el footer automáticamente para todas las páginas

function crearFooter() {
    // Verificar si ya existe el footer
    if (document.querySelector('.footer')) return;

    // Crear el elemento footer
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    footer.innerHTML = `
        <div class="footer-container">
            <!-- BRAND -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <div class="footer-logo-icon">
                        <i class="bi bi-cake2-fill"></i>
                    </div>
                    <div>
                        <h3>Dulce Amor</h3>
                        <span>Repostería Karen</span>
                    </div>
                </div>
                <p>Creando momentos dulces y memorables con cada detalle y cada sabor.</p>
                <p class="footer-tagline">Endulzamos tus momentos especiales ✨</p>
            </div>

            <!-- LINKS -->
            <div class="footer-section">
                <h4>Enlaces</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="index.html#productos">Productos</a></li>
                    <li><a href="servicios.html">Servicios</a></li>
                    <li><a href="blog.html">Blog</a></li>
                </ul>
            </div>

            <!-- CONTACT -->
            <div class="footer-section">
                <h4>Contacto</h4>
                <div class="footer-contact">
                    <p>
                        <i class="bi bi-telephone-fill"></i>
                        +573006194301
                    </p>
                    <p>
                        <i class="bi bi-envelope-fill"></i>
                        dulciamorkaren@gmail.com
                    </p>
                </div>
            </div>

            <!-- SOCIAL -->
            <div class="footer-section">
                <h4>Síguenos</h4>
                <div class="social-icons">
                    <a href="https://www.instagram.com/karens_cake_shop?igsh=MTE1emZhOHY5aHpueQ%3D%3D" target="_blank" class="social-link instagram">
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a href="https://facebook.com/dulceamorkaren" target="_blank" class="social-link facebook">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a href="https://tiktok.com/@dulceamorkaren" target="_blank" class="social-link tiktok">
                        <i class="bi bi-tiktok"></i>
                    </a>
                </div>
            </div>
        </div>
        <!-- BOTTOM -->
        <div class="footer-bottom">
            <p>© 2026 Repostería Karen • Todos los derechos reservados</p>
        </div>
    `;

    // Insertar el footer al final del body
    document.body.appendChild(footer);
}

// Ejecutar la función para crear el footer
crearFooter();