import templateForm from "../templates/form.hbs";
import templateGallery from "../templates/gallery.hbs";
import templateImage from "../templates/image.hbs";
import { fetchImages } from "./apiService.js";

// import SimpleLightbox from "simplelightbox";
import * as basicLightbox from 'basiclightbox';

function instance(e) {
    // console.log(e.target.currentSrc);
    basicLightbox.create(`<img src=${e} />`).show();
}

instance('https://pixabay.com/get/g8d1b0ff76bd95f3ca1d174109d6853bd09a35b67650c2843da35e7be7605362decbb1d8c5b9eeb42701a4b3bea54a18d_640.jpg');

document.querySelector('button.large-img').onclick = () => {
	instance.close();
}

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
            const markup = images.hits.map((img) => { return templateImage(img)}).join("") + '<li class="last-item"><p class="buttonLoadMore"></p></li>';
            getGalleryRef.innerHTML = markup;
            // let gallery = new SimpleLightbox('.gallery a');

            const buttonLoadMoreRef = bodyRef.querySelector('.buttonLoadMore');
            buttonLoadMoreRef.addEventListener('click', getLoadMore);
        })
};

const searchImageRef = formRef.querySelector('.search-input');
searchImageRef.addEventListener('input', debounce(getImage, 500));

function getLoadMore() {
    fetchImages(image_type, query, page += 1, per_page, key)
        .then(images => {
            const getGalleryLastItemRef = getGalleryRef.querySelector('.last-item');
            const markup = images.hits.map((img) => { return templateImage(img) }).join("");
            getGalleryLastItemRef.insertAdjacentHTML("beforebegin", markup);
            // let gallery = new SimpleLightbox('.gallery a');
            scrollView();
        })
    
}
