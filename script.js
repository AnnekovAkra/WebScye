// ==========================================================================
// 1. УЛЬТРА-ПЛOTНЫЙ ТРЁХСЛОЙНЫЙ КОСМИЧЕСКИЙ ФОН (450 ХАОТИЧНЫХ ЗВЁЗД)
// ==========================================================================
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 450; // Увеличили количество в 3 раза для максимальной плотности

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Генерируем глубокую трёхмерную звёздную систему
for (let i = 0; i < numStars; i++) {
    // Разделяем звёзды на 3 слоя случайным образом
    let layer = Math.random();
    let radius, vx, vy, alpha, vAlpha, shadow;

    if (layer < 0.6) {
        // 1 слой: Множество мелких дальних звёзд (60% от всей массы)
        radius = Math.random() * 0.6 + 0.2;
        vx = (Math.random() - 0.5) * 0.15;
        vy = (Math.random() - 0.5) * 0.15;
        alpha = Math.random() * 0.4 + 0.1;
        vAlpha = Math.random() * 0.005 + 0.002;
        shadow = 0; // Без тени для экономии производительности
    } else if (layer < 0.9) {
        // 2 слой: Средние мерцающие звёзды (30%)
        radius = Math.random() * 1.2 + 0.6;
        vx = (Math.random() - 0.5) * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
        alpha = Math.random() * 0.6 + 0.3;
        vAlpha = Math.random() * 0.01 + 0.005;
        shadow = 4;
    } else {
        // 3 слой: Крупные, сверх-яркие ближние звёзды (10% — пролетают за матовым стеклом)
        radius = Math.random() * 2.2 + 1.2;
        vx = (Math.random() - 0.5) * 0.5;
        vy = (Math.random() - 0.5) * 0.5;
        alpha = Math.random() * 0.4 + 0.6; // Горят минимум на 60% яркости изначально
        vAlpha = Math.random() * 0.015 + 0.008;
        shadow = 12; // Мощный неоновый ореол
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
        // Хаотичное движение
        star.x += star.vx;
        star.y += star.vy;
        
        // Плавное дорогое мерцание
        star.alpha += star.vAlpha;
        if (star.alpha > 1 || star.alpha < 0.1) star.vAlpha = -star.vAlpha;

        // Отскок от невидимых космических границ экрана
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Врубаем неоновую белкую подсветку только для средних и крупных слоёв
        if (star.shadow > 0) {
            ctx.shadowBlur = star.shadow;
            ctx.shadowColor = "#ffffff";
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.fill();
    });
    
    ctx.shadowBlur = 0; // Жёсткий сброс тени, чтобы остальной интерфейс сайта не лагал
    requestAnimationFrame(animateStars);
}
animateStars();

// ==========================================================================
// 2. ПРЕМИАЛЬНЫЙ КУРСОР "СВЕТОВОЙ КЛИНОК" И МАТОВЫЕ КРУГОВЫЕ ВОЛНЫ
// ==========================================================================
const sCursor = document.getElementById('singularityCursor');
const clickContainer = document.getElementById('clickEffectsContainer');

let mX = 0, mY = 0; // Реальные координаты мыши
let cX = 0, cY = 0; // Координаты плавного шлейфа

const sSpeed = 0.16; // Благородная скорость инерции

window.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    sCursor.style.opacity = 1;
});

function animateSingularityCursor() {
    const dX = mX - cX;
    const dY = mY - cY;
    
    cX += dX * sSpeed;
    cY += dY * sSpeed; 
    
    sCursor.style.left = `${cX}px`;
    sCursor.style.top = `${cY}px`;
    
    requestAnimationFrame(animateSingularityCursor);
}
animateSingularityCursor();

// Импульсная матовая круговая волна при клике
window.addEventListener('mousedown', () => {
    sCursor.classList.add('target-click');
    
    const wave = document.createElement('div');
    wave.classList.add('click-circle-wave');
    wave.style.left = `${mX}px`;
    wave.style.top = `${mY}px`;
    clickContainer.appendChild(wave);
    
    setTimeout(() => { wave.remove(); }, 700); // Чистим память ПК после завершения анимации
});

window.addEventListener('mouseup', () => {
    sCursor.classList.remove('target-click');
});

// Триггеры захвата цели при наведении на интерактивные элементы
function initCursorTriggers() {
    const targetElements = document.querySelectorAll('a, button, input, .carousel-item, .card, .portfolio-item, .glass-input');

    targetElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            sCursor.classList.add('target-locked');
        });
        
        element.addEventListener('mouseleave', () => {
            sCursor.classList.remove('target-locked');
        });
    });
}
initCursorTriggers();

document.addEventListener('mouseleave', () => {
    sCursor.style.opacity = 0;
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
        let pointerEvents = absOffset === 0 ? 'auto' : 'none'; // Ссылки кликабельны только на центральной карте

        item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
        item.style.pointerEvents = pointerEvents;
        item.style.zIndex = 100 - absOffset;
    });
}
update3DCarousel();

// DRAG & DROP (Управление свайпами и мышкой)
let isDragging = false;
let startX = 0;
const container = document.querySelector('.carousel-container');

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;

    // Если протащили мышь/палец больше чем на 80px, переключаем карту
    if (Math.abs(diff) > 80) {
        if (diff > 0) {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        } else {
            currentIndex = (currentIndex + 1) % totalItems;
        }
        update3DCarousel();
        isDragging = false; // Сбрасываем триггер для пошагового контроля
    }
});

window.addEventListener('mouseup', () => { isDragging = false; });

// Поддержка мобильных тач-свайпов
container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; });
container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 60) {
        if (diff > 0) {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        } else {
            currentIndex = (currentIndex + 1) % totalItems;
        }
        update3DCarousel();
        isDragging = false;
    }
});
container.addEventListener('touchend', () => { isDragging = false; });


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
        
        // Расчет аккуратных углов наклона (до 10 градусов)
        const rotateX = ((centerY - y) / centerY) * 10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`; // Плавный возврат
    });
});
