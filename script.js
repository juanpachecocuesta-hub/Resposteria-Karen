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


// ============================================
// 12. CHAT FLOTANTE INTELIGENTE
// ============================================
// Chatbot que responde según lo que el usuario pregunte

// Función para crear el chat flotante
function crearChat() {
    // Si ya existe, no crear otro
    if (document.getElementById('chat-widget')) return;

    // Crear el contenedor principal del chat
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-widget';
    chatContainer.innerHTML = `
        <!-- Botón para abrir el chat -->
        <button id="chat-toggle" class="chat-toggle">
            <i class="bi bi-chat-dots-fill"></i>
            <span class="chat-notification" id="chat-notification">1</span>
        </button>

        <!-- Ventana del chat -->
        <div id="chat-window" class="chat-window">
            <!-- Encabezado del chat -->
            <div class="chat-header">
                <div class="chat-header-info">
                    <span class="chat-avatar">🍰</span>
                    <div>
                        <h4>Dulce Amor</h4>
                        <span class="chat-status">En línea</span>
                    </div>
                </div>
                <button id="chat-close" class="chat-close">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <!-- Mensajes del chat -->
            <div id="chat-messages" class="chat-messages">
                <div class="chat-message bot">
                    <div class="message-content">
                        ¡Hola! 👋 Bienvenido a Repostería Karen 🍰<br><br>
                        Soy el asistente virtual de <strong>Dulce Amor</strong>.<br><br>
                        ¿En qué puedo ayudarte hoy?
                    </div>
                </div>
            </div>

            <!-- Opciones rápidas -->
            <div class="chat-options" id="chat-options">
                <button class="chat-option" data-pregunta="precios">💰 Ver precios</button>
                <button class="chat-option" data-pregunta="productos">🍰 Productos</button>
                <button class="chat-option" data-pregunta="pedir">🛒 Hacer pedido</button>
                <button class="chat-option" data-pregunta="contacto">📞 Contacto</button>
            </div>

            <!-- Input del usuario -->
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." />
                <button id="chat-send" class="chat-send">
                    <i class="bi bi-send-fill"></i>
                </button>
            </div>
        </div>
    `;

    // Insertar al final del body
    document.body.appendChild(chatContainer);

    // Agregar eventos
    inicializarChat();
}

// Función que inicializa los eventos del chat
function inicializarChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatOptions = document.querySelectorAll('.chat-option');

    // Abrir/cerrar chat
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatToggle.classList.add('hidden');
        // Ocultar notificación
        document.getElementById('chat-notification').style.display = 'none';
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatToggle.classList.remove('hidden');
    });

    // Enviar mensaje con botón
    chatSend.addEventListener('click', () => procesarMensaje());

    // Enviar mensaje con Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') procesarMensaje();
    });

    // Opciones rápidas
    chatOptions.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const pregunta = opcion.dataset.pregunta;
            agregarMensajeUsuario(opcion.textContent);
            setTimeout(() => responder(pregunta), 500);
        });
    });
}

// Función para agregar mensaje del usuario
function agregarMensajeUsuario(texto) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `<div class="message-content">${texto}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para agregar respuesta del bot
function agregarRespuestaBot(texto) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.innerHTML = `<div class="message-content">${texto}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función principal que procesa el mensaje del usuario
function procesarMensaje() {
    const input = document.getElementById('chat-input');
    const mensaje = input.value.trim().toLowerCase();

    if (!mensaje) return;

    // Agregar mensaje del usuario
    agregarMensajeUsuario(input.value);
    input.value = '';

    // Procesar y responder después de un pequeño delay
    setTimeout(() => {
        const respuesta = obtenerRespuesta(mensaje);
        agregarRespuestaBot(respuesta);
    }, 600);
}

// Función que determina la respuesta según palabras clave
function obtenerRespuesta(mensaje) {
    // Palabras clave y sus respuestas
    const respuestas = {
        // SALUDOS
        'saludo': `¡Qué alegría verte por aquí! 😊<br><br>
        En <strong>Dulce Amor</strong> hacemos las tortas y cupcakes más ricos 🍰<br><br>
        ¿Te gustaría ver nuestros productos o necesitas algo específico?`,

        // PRECIOS
        'precios': `💰 <strong>Algunos de nuestros precios:</strong><br><br>
        • Pudín de Chocolate: <strong>$20.000</strong><br>
        • Pudín de Fresa: <strong>$22.000</strong><br>
        • Cupcakes Personalizados: <strong>$18.000</strong><br>
        • Brownie con Nueces: <strong>$25.000</strong><br><br>
        🧁 <strong>Tortas personalizadas:</strong> desde <strong>$80.000</strong><br><br>
        ¿Te interesa algún producto en especial?`,

        // PRODUCTOS
        'productos': `🍰 <strong>Nuestros productos:</strong><br><br>
        ✓ Tortas personalizadas para todo tipo de eventos<br>
        ✓ Cupcakes decorados<br>
        ✓ Pudines de chocolate y fresa<br>
        ✓ Brownies con nueces<br>
        ✓ Galletas artesanales<br><br>
        📸 También puedes ver nuestra galería en la página principal.<br><br>
        ¿Qué te gustaría pedir?`,

        // PEDIDOS
        'pedir': `🛒 ¡Perfecto! para hacer un pedido te contato directo por WhatsApp 💬<br><br>
        <a href="https://wa.me/573006194301" target="_blank" style="background:#25D366;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;margin-top:10px;">
        📱 Escribir por WhatsApp
        </a><br><br>
        O déjanos tu mensaje aquí y te contactamos pronto 😊`,

        // CONTACTO
        'contacto': `📞 <strong>联系我们 (Contáctanos):</strong><br><br>
        📱 <strong>WhatsApp:</strong> +57 300 619 4301<br>
        📧 <strong>Email:</strong> dulciamorkaren@gmail.com<br>
        📍 <strong>Ubicación:</strong> Colombia<br><br>
        <a href="https://wa.me/573006194301" target="_blank" style="background:#25D366;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;">
        💬 Escribir por WhatsApp
        </a>`,

        // SERVICIOS
        'servicios': `🎂 <strong>Nuestros servicios:</strong><br><br>
        ✓ <strong>Bodas:</strong> Tortas de 1 a 5 pisos<br>
        ✓ <strong>XV Años:</strong> Mesas de dulces temáticas<br>
        ✓ <strong>Cumpleaños:</strong> Tortas infantiles y adultas<br>
        ✓ <strong>Eventos:</strong> Baby showers, corporativo<br><br>
        💰 Precios desde $80.000<br><br>
        ¿Para qué evento necesitas?`,

        // DÓNDE ESTÁN / UBICACIÓN
        'ubicacion': `📍 Estamos en <strong>Colombia</strong> 🇨🇴<br><br>
        Realizamos entregas en la zona y también puedes pasar a recoger tu pedido.<br><br>
        ¿En qué ciudad te encuentras? Así te podemos informar mejor sobre entregas.`,

        // HORARIO
        'horario': `🕐 <strong>Horario de atención:</strong><br><br>
        Lunes a Sábado: 9:00 AM - 6:00 PM<br>
        Domingos: Solo con cita previa<br><br>
        ¿En qué día te gustaría retirar tu pedido?`,

        // AGRADECIMIENTOS
        'gracias': `¡De nada! 😊<br><br>
        En <strong>Dulce Amor</strong> nos gusta atender bien a todos nuestros clientes.<br><br>
        ¿Hay algo más en lo que pueda ayudarte?`,

        // DESPEDIDA
        'despedida': `¡Que tengas un día muy dulce! 🍰<br><br>
        Gracias por contactarnos. Cuando quieras volver, aquí-estamos 😊<br><br>
        <strong>¡Endulzamos tus momentos especiales!</strong> ✨`,

        // DEFAULT
        'default': `¡Entendido! 😊<br><br>
        No tengo información específica sobre eso, pero puedo ayudarte a contactar directamente con <strong>Dulce Amor</strong>.<br><br>
        <a href="https://wa.me/573006194301" target="_blank" style="background:#25D366;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;">
        💬 Escribir por WhatsApp
        </a><br><br>
        O escoge una opción:`,
    };

    // Detectar palabras clave en el mensaje
    if (mensaje.match(/hola|buenos|buenas|saludos|hi|hello|que tal|que onda/i)) {
        return respuestas.saludo;
    }
    if (mensaje.match(/precio|cuánto|cuesta|cost|valor|plata|precio/i)) {
        return respuestas.precios;
    }
    if (mensaje.match(/producto|torta|cupcake|pudín|brownie|galleta|postre|menu|catálogo/i)) {
        return respuestas.productos;
    }
    if (mensaje.match(/pedir|comprar|ordenar|quiero|adquirir|reservar/i)) {
        return respuestas.pedir;
    }
       if (mensaje.match(/contacto|contactar|whatsapp|teléfono|celular|llamar|escribir/i)) {
        return respuestas.contacto;
    }
    if (mensaje.match(/servicio|boda|xv|cumpleaños|evento|baby|corporativo/i)) {
        return respuestas.servicios;
    }
    if (mensaje.match(/ubicación|donde|están|address|dónde están|ubicado/i)) {
        return respuestas.ubicacion;
    }
    if (mensaje.match(/horario|hora|abierto|cerrado|atención/i)) {
        return respuestas.horario;
    }
    if (mensaje.match(/gracias|thank|agradecido|te lo agradez|Muchas gracias/i)) {
        return respuestas.gracias;
    }
    if (mensaje.match(/adiós|chao|bye|nos|voy|me voy|hasta luego|hasta pronto/i)) {
        return respuestas.despedida;
    }

    // Si no encuentra ninguna palabra clave
    return respuestas.default;
}

// Función para simular respuesta de una opción rápida
function responder(tipo) {
    let respuesta = '';

    switch(tipo) {
        case 'precios':
            respuesta = obtenerRespuesta('precios');
            break;
        case 'productos':
            respuesta = obtenerRespuesta('productos');
            break;
        case 'pedir':
            respuesta = obtenerRespuesta('pedir');
            break;
        case 'contacto':
            respuesta = obtenerRespuesta('contacto');
            break;
        default:
            respuesta = '¿En qué más puedo ayudarte?';
    }

    agregarRespuestaBot(respuesta);
}

// Inicializar el chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', crearChat);


// ============================================
// 13. SLIDER DE TESTIMONIOS
// ============================================
// Carrusel automático de testimonios con navegación

// Variables del slider
let currentTestimonial = 0;
let track = null;
let cards = [];
const cardsPerView = 3;
let totalTestimonials = 0;
let autoSlideInterval = null;

// Función para inicializar el slider
function inicializarSlider() {
    track = document.getElementById('testimonials-track');
    cards = document.querySelectorAll('.testimonial-card');
    totalTestimonials = cards.length;
    
    if (!track || totalTestimonials === 0) return;
    
    // Crear puntos indicadores
    crearDotsTestimonios();
    
    // Iniciar auto-slide
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(moverAutoTestimonial, 5000);
}

// Crear puntos indicadores
function crearDotsTestimonios() {
    const dotsContainer = document.getElementById('testimonials-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(totalTestimonials / cardsPerView);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => irATestimonial(i);
        dotsContainer.appendChild(dot);
    }
}

// Función para mover el slider manualmente
function moverTestimonial(direccion) {
    const maxSlide = Math.ceil(totalTestimonials / cardsPerView) - 1;
    
    currentTestimonial += direccion;
    
    if (currentTestimonial < 0) currentTestimonial = 0;
    if (currentTestimonial > maxSlide) currentTestimonial = maxSlide;
    
    actualizarSlider();
    
    // Reiniciar el auto-slide después de interacción manual
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(moverAutoTestimonial, 5000);
    }
}

// Función para auto-mover cada 5 segundos
function moverAutoTestimonial() {
    const maxSlide = Math.ceil(totalTestimonials / cardsPerView) - 1;
    
    if (currentTestimonial < maxSlide) {
        currentTestimonial++;
    } else {
        currentTestimonial = 0;
    }
    
    actualizarSlider();
}

// Actualizar la posición del slider
function actualizarSlider() {
    if (!track) return;
    
    const moveAmount = currentTestimonial * (100 / cardsPerView);
    track.style.transform = `translateX(-${moveAmount}%)`;
    
    actualizarDotsTestimonios();
}

// Función para ir a un slide específico
function irATestimonial(slide) {
    currentTestimonial = slide;
    actualizarSlider();
    
    // Reiniciar auto-slide
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(moverAutoTestimonial, 5000);
    }
}

// Actualizar los puntos activos
function actualizarDotsTestimonios() {
    const dots = document.querySelectorAll('.testimonial-dot');
    const activeDot = currentTestimonial;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDot);
    });
}

// Hacer funciones globales para que funcionen con onclick
window.moverTestimonial = function(direccion) {
    moverTestimonial(direccion);
};

window.irATestimonial = function(slide) {
    irATestimonial(slide);
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(inicializarSlider, 200);
});

// También intentar si ya está cargado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(inicializarSlider, 200);
}