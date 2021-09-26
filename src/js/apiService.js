export function fetchImages(image_type, query, page, per_page, key) {
  return fetch(`https://pixabay.com/api/?image_type=${image_type}&q=${query}&page=${page}&per_page=${per_page}&key=${key}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
};  