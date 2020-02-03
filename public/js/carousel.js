const createCarouselBlock = (data) => {
    let carouselElem = document.createElement('div');
    carouselElem.classList.add('main-carousel');


    data.images.forEach((el) => {
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-cell');

        let img = document.createElement('img');
        img.classList.add('b-carousel__img');
        img.src = el.toString();
        carouselItem.appendChild(img);
        carouselElem.appendChild(carouselItem);
    });

    setTimeout(() => {
        /*new Carousel({
            sel: {
                main: carouselElem,
                wrap: carouselWrap,
                children: carouselWrap.children,
                prev: prevButton,
                next: nextButton
            }
        });*/
        let flkty = new Flickity( carouselElem, {
            // options
            cellAlign: 'left',
            contain: true
        });

    }, 100);


    return carouselElem
};
