// ==========================================================================
// 1. УЛЬТРА-ПЛOТНЫЙ ТРЁХСЛОЙНЫЙ КОСМИЧЕСКИЙ ФОН (450 ХАОТИЧНЫХ ЗВЁЗД)
// ==========================================================================
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 450; // Навалили максимум плотности для глубокого космоса

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Генерируем трехмерную звездную систему с разной глубиной слоев
for (let i = 0; i < numStars; i++) {
    let layer = Math.random();
    let radius, vx, vy, alpha, vAlpha, shadow;

    if (layer < 0.6) {
        // 1 слой: Мелкая далекая звездная пыль (60% всей массы)
        radius = Math.random() * 0.6 + 0.2;
        vx = (Math.random() - 0.5) * 0.15;
        vy = (Math.random() - 0.5) * 0.15;
        alpha = Math.random() * 0.4 + 0.1;
        vAlpha = Math.random() * 0.005 + 0.002;
        shadow = 0;
    } else if (layer < 0.9) {
        // 2 слой: Средние сияющие звезды (30%)
        radius = Math.random() * 1.2 + 0.6;
        vx = (Math.random() - 0.5) * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
        alpha = Math.random() * 0.6 + 0.3;
        vAlpha = Math.random() * 0.01 + 0.005;
        shadow = 4;
    } else {
        // 3 слой: Крупные белые звезды за матовым стеклом (10%)
        radius = Math.random() * 2.2 + 1.2;
        vx = (Math.random() - 0.5) * 0.5;
        vy = (Math.random() - 0.5) * 0.5;
        alpha = Math.random() * 0.4 + 0.6;
        vAlpha = Math.random() * 0.015 + 0.008;
        shadow = 12; // Элитный неоновый ореол свечения
    }

    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        vx: vx,
        vy: vy,
        alpha: alpha,
        vAlpha: vAlpha,
        shadow: shadow
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        // Движение по хаотичным векторам
        star.x += star.vx;
        star.y += star.vy;
        
        // Плавное мерцание
        star.alpha += star.vAlpha;
        if (star.alpha > 1 || star.alpha < 0.1) star.vAlpha = -star.vAlpha;

        // Отскок от невидимых космических границ экрана
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Врубаем неоновую белую тень только крупным звездам
        if (star.shadow > 0) {
            ctx.shadowBlur = star.shadow;
            ctx.shadowColor = "#ffffff";
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.fill();
    });
    
    ctx.shadowBlur = 0; // Жесткий сброс тени, чтобы интерфейс сайта не тормозил
    requestAnimationFrame(animateStars);
}
animateStars();


// ==========================================================================
// 2. ХАЙ-ЭНД КУРСОР "СВЕТОВОЙ КЛИНОК" И МАТОВЫЕ КРУГОВЫЕ ВОЛНЫ (ИСПРАВЛЕНО)
// ==========================================================================
const sCursor = document.getElementById('singularityCursor');
const clickContainer = document.getElementById('clickEffectsContainer');

let mX = 0, mY = 0; // Позиция мыши
let cX = 0, cY = 0; // Позиция плавного шлейфа
const sCursorSpeed = 0.16; // Скорость инерции

window.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    if(sCursor) sCursor.style.opacity = 1;
});

function animateSingularityCursor() {
    const dX = mX - cX;
    const dY = mY - cY;
    
    // Инерционное плавное следование
    cX += dX * sCursorSpeed;
    cY += dY * sCursorSpeed; // Исправлено! Никаких pSpeed, только sCursorSpeed
    
    if(sCursor) {
        sCursor.style.left = `${cX}px`;
        sCursor.style.top = `${cY}px`;
    }
    
    requestAnimationFrame(animateSingularityCursor);
}
animateSingularityCursor();

// Генерация круговой матовой волны при нажатии (клике)
window.addEventListener('mousedown', () => {
    if(sCursor) sCursor.classList.add('target-click');
    const wave = document.createElement('div');
    wave.classList.add('click-circle-wave');
    wave.style.left = `${mX}px`;
    wave.style.top = `${mY}px`;
    if(clickContainer) clickContainer.appendChild(wave);
    setTimeout(() => { wave.remove(); }, 700);
});

window.addEventListener('mouseup', () => {
    if(sCursor) sCursor.classList.remove('target-click');
});

function initCursorTriggers() {
    const targetElements = document.querySelectorAll('a, button, input, .carousel-item, .card, .portfolio-item, .glass-input');
    targetElements.forEach(element => {
        element.addEventListener('mouseenter', () => { if(sCursor) sCursor.classList.add('target-locked'); });
        element.addEventListener('mouseleave', () => { if(sCursor) sCursor.classList.remove('target-locked'); });
    });
}
initCursorTriggers();

document.addEventListener('mouseleave', () => {
    if(sCursor) sCursor.style.opacity = 0;
});
// ==========================================================================
// 3. ИНТЕЛЛЕКТУАЛЬНАЯ СИСТЕМА 3D КАРУСЕЛИ (10 ТАРИФОВ)
// ==========================================================================
const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const totalItems = items.length;

const spacing = 280;          // Расстояние между картами по горизонтали
const rotateYAmount = 45;     // Угол разворота боковых карт в 3D
const translateZAmount = -300; // Глубина ухода карт на задний план

function update3DCarousel() {
    items.forEach((item, index) => {
        let offset = index - currentIndex;
        
        // Математика зацикливания для бесконечной прокрутки в обе стороны
        if (offset > totalItems / 2) offset -= totalItems;
        if (offset < -totalItems / 2) offset += totalItems;

        const absOffset = Math.abs(offset);
        
        let translateX = offset * spacing;
        let translateZ = absOffset * translateZAmount;
        let rotateY = offset * -rotateYAmount;
        let opacity = 1 - (absOffset * 0.35); 
        let pointerEvents = absOffset === 0 ? 'auto' : 'none'; // Кнопки активны только на центральной карте

        item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
        item.style.pointerEvents = pointerEvents;
        item.style.zIndex = 100 - absOffset;
    });
}
if (items.length > 0) {
    update3DCarousel();
}

// DRAG & DROP ДЛЯ КАРУСЕЛИ (Управление мышкой)
let isDragging = false;
let startX = 0;
const container = document.querySelector('.carousel-container');

if (container) {
    container.addEventListener('mousedown', (e) => { 
        isDragging = true; 
        startX = e.clientX; 
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;

        // Если протащили мышь больше чем на 80px, переключаем карту
        if (Math.abs(diff) > 80) {
            if (diff > 0) { currentIndex = (currentIndex - 1 + totalItems) % totalItems; }
            else { currentIndex = (currentIndex + 1) % totalItems; }
            update3DCarousel();
            isDragging = false; // Сбрасываем триггер для плавности контроля
        }
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Поддержка мобильных тач-свайпов
    container.addEventListener('touchstart', (e) => { startX = e.touches.clientX; isDragging = true; });
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches.clientX;
        const diff = currentX - startX;

        if (Math.abs(diff) > 60) {
            if (diff > 0) { currentIndex = (currentIndex - 1 + totalItems) % totalItems; }
            else { currentIndex = (currentIndex + 1) % totalItems; }
            update3DCarousel();
            isDragging = false;
        }
    });
    container.addEventListener('touchend', () => { isDragging = false; });
}

// ==========================================================================
// 4. ДОРОГОЙ 3D НАКЛОН ДЛЯ КАРТОЧЕК ПРЕИМУЩЕСТВ И ПОРТФОЛИО
// ==========================================================================
const cards3D = document.querySelectorAll('.data-3d, .data-3d-portfolio');

cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Аккуратный угол наклона (до 10 градусов)
        const rotateX = ((centerY - y) / centerY) * 10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`; // Мягкий возврат
    });
});


// ==========================================================================
// 5. ИНТЕЛЛЕКТУАЛЬНЫЙ ЮРИДИЧЕСКИЙ ДВИЖОК ВКЛАДОК И COOKIE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const cookieAccepted = localStorage.getItem("webscye_cookies_accepted");
    if (!cookieAccepted) {
        // Мягко показываем шторку через 2 секунды после захода на сайт
        setTimeout(() => { 
            const cookieNotice = document.getElementById("cookieNotice");
            if (cookieNotice) cookieNotice.classList.add("show"); 
        }, 2000);
    }
});

function acceptCookies() {
    localStorage.setItem("webscye_cookies_accepted", "true");
    const cookieNotice = document.getElementById("cookieNotice");
    if (cookieNotice) cookieNotice.classList.remove("show");
}

function openLawModal(event, targetTab) {
    if (event) event.preventDefault(); // Блокируем перезагрузку страницы
    const lawModal = document.getElementById("lawModal");
    if (lawModal) lawModal.classList.add("show");
    switchLawTab(targetTab); // Открываем именно ту вкладку, на которую кликнули
}

function closeLawModal() { 
    const lawModal = document.getElementById("lawModal");
    if (lawModal) lawModal.classList.remove("show"); 
}

function switchLawTab(tabName) {
    // Сбрасываем старые активные классы с кнопок и контента
    document.querySelectorAll('.law-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.law-tab-content').forEach(content => content.classList.remove('active'));
    
    // Активируем нужную вкладку
    const tabBtn = document.getElementById(`tab-${tabName}`);
    const tabContent = document.getElementById(`content-${tabName}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
}

// Закрытие по клику на пустое пространство вокруг окна
window.addEventListener("click", (e) => {
    const modal = document.getElementById("lawModal");
    if (e.target === modal) { closeLawModal(); }
});

// Валидация продающей формы перед отправкой
function handleFormSubmit() {
    const checkbox = document.getElementById("privacyCheckbox");
    if (checkbox && !checkbox.checked) { 
        alert("Пожалуйста, подтвердите согласие на обработку персональных данных."); 
        return; 
    }
    alert("Ваш запрос принят. Наш ведущий архитектор свяжется с вами в течение часа.");
}

