// Показывает или скрывает окно с данными формы (кнопки «Отправить» и «Закрыть»)
function dertiger() {
    // Ищем оверлей по id из HTML
    var overlay = document.getElementById("bibr");
    // Ищем блок, куда выводим текст данных формы
    var contentEl = document.getElementById("bibr-content");
    // Если чего-то нет — выходим, иначе будет ошибка в консоли
    if (!overlay || !contentEl) return;

    // Проверяем: окно уже открыто?
    if (overlay.classList.contains("form-notification-visible")) {
        // Убираем класс — окно скрывается (в CSS по нему display: flex)
        overlay.classList.remove("form-notification-visible");
        // Для доступности помечаем, что блок скрыт
        overlay.setAttribute("aria-hidden", "true");
        return;
    }

    // Берём значение поля «Имя»; если элемента нет — пустая строка
    var name = (document.getElementById("name") || {}).value || "";
    // Поле «Компания»
    var company = (document.getElementById("company") || {}).value || "";
    // Поле «E-mail»
    var email = (document.getElementById("email") || {}).value || "";
    // Поле «Телефон»
    var tel = (document.getElementById("tel") || {}).value || "";
    // Поле «Сообщение»
    var message = (document.getElementById("message") || {}).value || "";
    // Убираем пробелы в начале и в конце у каждого значения
    name = name.trim();
    company = company.trim();
    email = email.trim();
    tel = tel.trim();
    message = message.trim();

    // Строка с результатом: по очереди добавляем непустые поля
    var text = "";
    if (name) text += "Имя: " + name + "\n";
    if (company) text += "Компания: " + company + "\n";
    if (email) text += "E-mail: " + email + "\n";
    if (tel) text += "Телефон: " + tel + "\n";
    if (message) text += "Сообщение: " + message + "\n";
    // Если все поля пустые — выводим подсказку
    if (!text) text = "Заполните хотя бы одно поле формы.";

    // Экранируем HTML в тексте, затем переносы строк делаем тегом <br>
    contentEl.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
    // Добавляем класс — в CSS по нему окно показывается (display: flex)
    overlay.classList.add("form-notification-visible");
    // Для доступности: блок виден
    overlay.setAttribute("aria-hidden", "false");
}

// Делает текст безопасным для вставки в HTML (защита от ввода тегов)
function escapeHtml(text) {
    // Временный элемент: в него записываем текст как обычный текст
    var div = document.createElement("div");
    div.textContent = text;
    // innerHTML уже будет с экранированными символами (< > & и т.д.)
    return div.innerHTML;
}
