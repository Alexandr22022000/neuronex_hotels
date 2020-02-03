const createCarouselBlock = (data) => {
    let carouselElem = document.createElement('div');
    carouselElem.classList.add('glider-contain');
    carouselElem.innerHTML = '<a class="glider-prev"><</a><a class="glider-next">></a>';

    let elemsList = document.createElement('div');
    elemsList.classList.add('glider');

    data.images.forEach((el) => {
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-cell');

        let img = document.createElement('img');
        img.classList.add('b-carousel__img');
        img.src = el.toString();
        carouselItem.appendChild(img);
        elemsList.appendChild(carouselItem);
    });

    carouselElem.prepend(elemsList);

    setTimeout(() => {
        new Glider(elemsList, {
            slidesToScroll: 1,
            slidesToShow: 0.9,
            draggable: true,
            scrollLockDelay: 150,
            dragVelocity: 1.5,
            scrollLock: true,
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
        })
    }, 1);


    return carouselElem
};
