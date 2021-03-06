import templateForm from "../templates/form.hbs";
import templateGallery from "../templates/gallery.hbs";
import templateImage from "../templates/image.hbs";
import { fetchImages } from "./apiService.js";

// import SimpleLightbox from "simplelightbox";
import * as basicLightbox from 'basiclightbox';

const prevRef = document.querySelector('.prev');

function getNextImg(e) {
    console.log(e.target);
}


function instance(e) {
    if (e.target.className === 'link-img') {
        console.log(e);
        basicLightbox.create(`<div class="navigation"><button class="prev"><</button><img src=${e.target.dataset.largesrc} /><button class="next">></button></div>`).show();
        
        const nextRef = document.querySelector('.next');
        nextRef.addEventListener('click', getNextImg);
    }
}


// document.querySelector('button.large-img').onclick = () => {
//     instance();

// }
//--------------------------------------------
let observer = new IntersectionObserver((entries, observer) => {
    console.log("observer ok");
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("entry ok");
            getLoadMore();
        }
        observer.unobserve(entry.target);
        observer.observe(document.querySelector('li:last-child'));

    })
}, { threshold: 1 });


//--------------------------------------------

const debounce = require('lodash.debounce');


const bodyRef = document.querySelector('body');

bodyRef.insertAdjacentHTML('afterbegin', templateForm());

const formRef = bodyRef.querySelector('#search-form');

formRef.insertAdjacentHTML('afterend', templateGallery());



const linkLargeImage = document.querySelector('.gallery');

linkLargeImage.addEventListener('click', instance);



const element = document.getElementById('my-element-selector');

function scrollView() {
    element.scrollIntoView({block: "end", behavior: "smooth"});
}

const getGalleryRef = bodyRef.querySelector('.gallery');

const options = {
    image_type: 'photo',
    query: '',
    page: 0,
    per_page: 12,
    key: '8645843-73f0b565a99dd2126325d1c4b',
}
let { image_type, query, page, per_page, key } = options;
let bgrToggle = 1;

function getImage(e) {
    if (e.target.value === '' || e.target.value === " ") {
        getGalleryRef.innerHTML = '';
        if (bgrToggle === 0) bodyRef.classList.toggle("bgr");
        bgrToggle = 1;
        return;
    }
    if (bgrToggle === 1) {
        bodyRef.classList.toggle("bgr");
        bgrToggle = 0;
    }
    fetchImages(image_type, query = e.target.value, page = 1, per_page, key)
    .then(images => {
        if (images.hits.length === 0) {
            getGalleryRef.innerHTML = '';
            if (bgrToggle === 0) {
                bodyRef.classList.toggle("bgr");
                bgrToggle = 1;
            }
            return;
        }
        const markup = images.hits.map((img) => { return templateImage(img) }).join("") + '<li class="last-item"><p class="buttonLoadMore"></p></li>';
        getGalleryRef.innerHTML = markup;
        // let gallery = new SimpleLightbox('.gallery a');
        
        const buttonLoadMoreRef = bodyRef.querySelector('.buttonLoadMore');
        buttonLoadMoreRef.addEventListener('click', getLoadMore);
        
        observer.observe(document.querySelector('li:last-child'));
        // observer.observe(document.querySelector('li'));
    });
};

const searchImageRef = formRef.querySelector('.search-input');
searchImageRef.addEventListener('input', debounce(getImage, 500));

function getLoadMore() {
    fetchImages(image_type, query, page += 1, per_page, key)
    .then(images => {
        console.log(page);
        const getGalleryLastItemRef = getGalleryRef.querySelector('.last-item');
        const markup = images.hits.map((img) => { return templateImage(img) }).join("");
        getGalleryLastItemRef.insertAdjacentHTML("beforebegin", markup);
        // let gallery = new SimpleLightbox('.gallery a');
        scrollView();
    })
}
