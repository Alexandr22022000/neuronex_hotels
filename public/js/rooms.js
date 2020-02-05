Element.prototype.hiddable = function () {
    let defaultDisplayValue = this.style.display;
    this.hide = function () {
        defaultDisplayValue = this.style.display;
        this.style.display = 'none';
    };

    this.show = function () {
        this.style.display = defaultDisplayValue;
    };
};

let lastApartments = [];
let lastDays = 1;

UI.setApartments = function (apartments, nights) {
    lastApartments = apartments;
    lastDays = nights;
    addRoomList(apartments, nights);
    UI.removeHider('card-hider');
};

document.addEventListener('DOMContentLoaded', () => {
    document.isNarrow = document.body.clientWidth < 768;

    document.querySelector('.dates-link').href = `${window.location.origin}/firstpage${window.location.search}`;

    window.addEventListener('resize', () => {
        if (!document.isNarrow && document.body.clientWidth < 768 || document.isNarrow && document.body.clientWidth >= 768) {
            document.isNarrow = document.body.clientWidth < 768;
            let roomList = document.querySelector('.room-scroller');
            roomList.innerHTML = '';
            lastApartments.forEach((el) => {
                roomList.appendChild(createRoomCard(el, lastDays))
            });
        }
    });
});

const addRoomList  = (rooms, nights) => {
    let roomList = document.querySelector('.room-scroller');
    roomList.innerHTML = '';
    rooms.forEach((el) => {
        roomList.appendChild(createRoomCard(el, nights))
    });
};

const createRoomCard = (data, days) => {
    if (document.isNarrow) {
        return createRoomCardMobile(data, days);
    }
    else {
        return createRoomCardLarge(data, days);
    }
};

const createRoomCardMobile = (data, days) => {
    let cardElem = createCardElem();

    cardElem.appendChild(createHeaderBlock(data));
    cardElem.appendChild(createHiddenBodyBlock(data));
    cardElem.appendChild(createImageBlock(data));
    cardElem.appendChild(createPriceBlock(data, days));

    return cardElem;
};

const createRoomCardLarge = (data, days) => {
    let cardElem = createCardElem(data);

    let cardDataElem = document.createElement('div');
    cardDataElem.classList.add('room-card-data');

    cardDataElem.appendChild(createHeaderBlock(data));
    cardDataElem.appendChild(createBodyBlock(data));
    cardDataElem.appendChild(createPriceBlock(data, days));

    cardElem.appendChild(createImageBlock(data));
    cardElem.appendChild(cardDataElem);

    return cardElem;
};

const createCardElem = () => {
    let cardElem = document.createElement('div');
    cardElem.classList.add('room-card');
    cardElem.classList.add('flex-container');
    cardElem.classList.add('vert-top');
    cardElem.classList.add('border-bottom-1');
    cardElem.classList.add('border-black');

    return cardElem;
};

const createImageBlock = (data) => {
    let imgHoldElem = document.createElement('div');
    imgHoldElem.classList.add('room-card-img-hl');
    imgHoldElem.classList.add('flex-container');
    imgHoldElem.classList.add('vert-center');
    if (document.isNarrow)
        imgHoldElem.classList.add('hor-center');
    else
        imgHoldElem.classList.add('hor-left');

    let carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wp');

    let cardImageElem = createCarouselBlock(data);

    carouselWrapper.appendChild(cardImageElem);

    imgHoldElem.appendChild(carouselWrapper);

    return imgHoldElem;
};

const createHeaderBlock = (data) => {
    let cardHeaderElem = document.createElement('div');
    cardHeaderElem.classList.add('room-card-header');
    if (!document.isNarrow) {
        cardHeaderElem.innerText = data.name;
    }
    else {
        cardHeaderElem.classList.add('flex-container');
        cardHeaderElem.classList.add('sp-between');

        let headText = document.createElement('span');
        headText.innerText = data.name;
        cardHeaderElem.appendChild(headText);

        let expanded = false;
        let expandButton = document.createElement('button');
        expandButton.classList.add('card-header-expander');
        expandButton.innerText = 'Подробнее';
        expandButton.addEventListener('click', () => {
            if (!expanded) {
                expanded = true;
                expandButton.innerText = 'Скрыть';
                cardHeaderElem.parentNode.children[1].show();
                return;
            }
            expanded = false;
            expandButton.innerText = 'Подробнее';
            cardHeaderElem.parentNode.children[1].hide();
        });
        cardHeaderElem.appendChild(expandButton);
    }

    return cardHeaderElem;
};

const createBodyBlock = (data) => {
    let cardBodyElem = document.createElement('div');
    cardBodyElem.classList.add('room-card-body');

    let text = document.createElement('div');
    text.innerText = data.description.length > 100? data.description.slice(0, 97) + '...' : data.description;

    cardBodyElem.appendChild(text);

    if (data.description.length > 100) {
        let expanded = false;
        let expandButton = document.createElement('div');
        expandButton.classList.add('card-body-expander');
        expandButton.innerText = 'Подробное описание...';
        expandButton.addEventListener('click', () => {
            if (!expanded) {
                text.innerText = data.description;
                expandButton.innerText = 'Скрыть подробное описание';
                expanded = true;
                return;
            }
            text.innerText = data.description.slice(0, 97) + '...';
            expandButton.innerText = 'Подробное описание...';
            expanded = false;
        });
        cardBodyElem.appendChild(expandButton);
    }

    return cardBodyElem;
};

const createPriceBlock = (data, days) => {
    let cardPriceHolderElem = document.createElement('div');
    cardPriceHolderElem.classList.add('room-card-price-hl');
    cardPriceHolderElem.classList.add('container');
    cardPriceHolderElem.classList.add('sp-between');

    let cardPriceElem = document.createElement('div');
    cardPriceElem.classList.add('room-card-price');
    cardPriceElem.classList.add('flex-container');

    let greenPriceElem = document.createElement('div');
    greenPriceElem.classList.add('room-card-price-green');
    greenPriceElem.classList.add('flex-container');
    greenPriceElem.classList.add('vert-bottom');
    greenPriceElem.innerText = `${UI.formatNumber(data.price)} ₽ * ${UI.formatDays(days)} = ${UI.formatNumber(+data.price * +days)} ₽`;

    let redPriceElem = document.createElement('div');
    redPriceElem.classList.add('room-card-price-red');
    redPriceElem.classList.add('flex-container');
    redPriceElem.classList.add('hor-right');
    redPriceElem.innerText = `скидка = ${UI.formatNumber(data.salePrice)} ₽`;

    let cardButtonHolder = document.createElement('div');
    cardButtonHolder.classList.add('room-card-price-btn-hl');
    cardButtonHolder.classList.add('flex-container');

    if (document.isNarrow) cardButtonHolder.classList.add('sp-between');
    else  cardButtonHolder.classList.add('hor-right');

    cardButtonHolder.classList.add('vert-center');

    let cardButtonSummary = document.createElement('div');
    cardButtonSummary.classList.add('room-card-price-summary');
    cardButtonSummary.classList.add('flex-container');
    cardButtonSummary.classList.add('vert-center');
    cardButtonSummary.innerText = `${document.isNarrow? "Итого: " : ""}${UI.formatNumber(data.price * days - data.salePrice)} ₽`;

    let cardButtonWp = document.createElement('a');
    cardButtonWp.classList.add('room-card-price-button');
    cardButtonWp.href = data.link + window.location.search;

    let cardButton = document.createElement('button');
    cardButton.classList.add('green-button-price');
    cardButton.innerText = 'Выбрать';

    cardButtonWp.appendChild(cardButton);
    cardButtonHolder.appendChild(cardButtonSummary);
    cardButtonHolder.appendChild(cardButtonWp);

    cardPriceElem.appendChild(greenPriceElem);
    cardPriceElem.appendChild(redPriceElem);

    cardPriceHolderElem.appendChild(cardPriceElem);
    cardPriceHolderElem.appendChild(cardButtonHolder);

    return cardPriceHolderElem;
};

const createHiddenBodyBlock = (data) => {
    let cardBodyElem = document.createElement('div');
    cardBodyElem.classList.add('room-card-body');
    cardBodyElem.style.paddingBottom = '10px';
    let text = document.createElement('div');
    text.innerText = data.description;
    cardBodyElem.appendChild(text);
    cardBodyElem.hiddable();
    cardBodyElem.hide();
    return cardBodyElem;
};

