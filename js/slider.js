// Слайдер в блоке screen-1: переключение слайдов по кнопкам, точкам и автоматически
(function () {
    // Ищем контейнер слайдера на странице
    var slider = document.querySelector('.screen-1.slider');
    // Если блока нет — скрипт не выполняется
    if (!slider) return;

    // Лента со слайдами (двигается влево/вправо через transform)
    var track = slider.querySelector('.screen-1-slides-track');
    // Все слайды (картинки)
    var slides = slider.querySelectorAll('.screen-1-slide');
    // Контейнер для точек внизу слайдера
    var dotsContainer = slider.querySelector('.slider-dots');
    // Кнопка «Назад»
    var prevBtn = slider.querySelector('.slider-prev');
    // Кнопка «Вперёд»
    var nextBtn = slider.querySelector('.slider-next');
    // Количество слайдов
    var total = slides.length;
    // Номер текущего слайда (с нуля)
    var current = 0;
    // Таймер автопрокрутки (останавливаем при наведении мыши)
    var autoTimer;
    // Интервал автопрокрутки в миллисекундах (3 секунды)
    var AUTO_INTERVAL = 3000;

    // Сдвигает ленту так, чтобы был виден слайд с номером current
    function setTrackPosition() {
        track.style.transform = 'translateX(-' + current * 100 + '%)';
    }

    // Меняет класс направления (next или prev) для разной анимации в CSS
    function setDirection(direction) {
        slider.classList.remove('slider-direction-next', 'slider-direction-prev');
        if (direction) {
            slider.classList.add('slider-direction-' + direction);
        }
    }

    // Переключает слайдер на слайд с номером index; direction — 'next' или 'prev' (для анимации)
    function showSlide(index, direction) {
        // Нормализуем индекс (зацикливание: после последнего — первый и наоборот)
        var nextIndex = (index + total) % total;
        // Если направление не передали — определяем по индексу (вперёд или назад)
        if (direction === undefined) {
            direction = nextIndex > current ? 'next' : (nextIndex < current ? 'prev' : null);
        }
        setDirection(direction);
        current = nextIndex;
        setTrackPosition();

        // Подсвечиваем активную точку внизу
        var dots = dotsContainer.querySelectorAll('span');
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === current);
        }
    }

    // Переход к следующему слайду (движение влево)
    function next() {
        showSlide(current + 1, 'next');
    }

    // Переход к предыдущему слайду (движение вправо)
    function prev() {
        showSlide(current - 1, 'prev');
    }

    // Включает автопрокрутку: каждые AUTO_INTERVAL мс вызывается next
    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, AUTO_INTERVAL);
    }

    // Останавливает автопрокрутку
    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // Создаём точки по числу слайдов и вешаем на них клик
    for (var i = 0; i < total; i++) {
        var dot = document.createElement('span');
        dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        // Замыкание: при клике переходим на слайд с индексом idx
        (function (idx) {
            dot.addEventListener('click', function () {
                showSlide(idx);
                startAuto();
            });
        })(i);
        dotsContainer.appendChild(dot);
    }

    // Кнопка «Назад»: предыдущий слайд и снова запуск автопрокрутки
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });
    // Кнопка «Вперёд»: следующий слайд и снова запуск автопрокрутки
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });

    // При наведении мыши на слайдер — останавливаем автопрокрутку
    slider.addEventListener('mouseenter', stopAuto);
    // При уходе мыши — снова запускаем автопрокрутку
    slider.addEventListener('mouseleave', startAuto);

    // Устанавливаем начальную позицию ленты (первый слайд)
    setTrackPosition();
    // Запускаем автопрокрутку при загрузке страницы
    startAuto();
})();
