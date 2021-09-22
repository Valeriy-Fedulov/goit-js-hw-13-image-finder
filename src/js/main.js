import templateForm from "../templates/form.hbs";
import templateGallery from "../templates/gallery.hbs";

// Форма поиска
// Создает DOM-элемент следующей структуры. Можно использовать шаблонизацию.
const bodyRef = document.querySelector('body');

bodyRef.insertAdjacentHTML('afterbegin', templateForm());

// Галерея изображений
// Создает DOM-элемент следующей структуры.
const formRef = bodyRef.querySelector('#search-form');

formRef.insertAdjacentHTML('afterend', templateGallery());

// Кнопка 'Load more'
// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими.

// Страница должна автоматически плавно проскроливаться после рендера изображений, чтобы перевести пользователя на следующие загруженные изображения. Используй метод Element.scrollIntoView().

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

// Дополнительно
// Можно добавить плагин нотификаций, например pnotify, и показывать нотификации на результат HTTP-запросов
// Можно добавить функционал отображения большой версии изображения через плагин модального окна, например basicLightbox, при клике на изображение галереи
// Вместо кнопки Load more можно сделать бесконечную загрузку при скроле используя Intersection Observer.
