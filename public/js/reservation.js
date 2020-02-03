UI.setApartment = function (obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('apart-hider');
    document.querySelector('.order-data').classList.remove('loading');
    document.querySelector('.room-details').classList.remove('loading');
    document.querySelector('.room-feat-sum').classList.remove('loading');

    let {name, description, images, price, salePrice} = obj;
    document.getElementById('room-name').innerText = name;
    document.getElementById('summary-price').innerText = this.formatNumber(price * this.dateObject.days - salePrice) + ' ₽';
    let dateStart = this.dateObject.start;
    let dateEnd = this.dateObject.end;
    document.getElementById('order-dates').innerHTML =
        `Заезд - ${dateStart.getDate()} ${this.monthArr[dateStart.getMonth()]} ${dateStart.getFullYear()} г <br>` +
        `Выезд - ${dateEnd.getDate()} ${this.monthArr[dateEnd.getMonth()]} ${dateEnd.getFullYear()} г`;

    let carousel = document.querySelector('.carousel-wp');
    carousel.classList.remove('loading');
    carousel.innerHTML = '';
    carousel.appendChild(createCarouselBlock({images}));
};

UI.setReservation = function(obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('user-data-hider');


    let {name, phone, email, wishes, status, humans, children} = obj;
    let nameElem = document.getElementById('name');
    let surname = document.getElementById('surname');
    if (surname) {
        let nameArr = name.split(' ');
        nameElem.innerText = nameArr[0];
        surname.innerText = nameArr.slice(1).join(' ');
    }
    else nameElem.innerText = name;
    document.getElementById('number').innerText = phone;
    document.getElementById('notes').innerText = wishes;
    document.getElementById('email').innerText = email;
    document.getElementById('humans').innerText = humans;
    document.getElementById('children').innerText = children;
    document.querySelector('.user-data-form').classList.remove('loading');
};

const removeSkeleton = () => {
    let style = document.getElementById('loaderSkeleton');
    if (!style) return;
    style.remove();
};

document.addEventListener('DOMContentLoaded', () => {
    document.isMobile = document.body.clientWidth < 768;

    setContent()
});

const setContent = () => {
    if (!document.isMobile) setDesktopVersion();
    else setMobileVersion();
};

const setDesktopVersion = () => {
    document.querySelector('.room-details-wp').innerHTML = `
    <div class="room-details flex-container sp-between">
                <div class="room-card-img-hl flex-container vert-center hor-center">
                    <div class="carousel-wp loading"></div>
                </div>
                <div class="order-data flex-container sp-around loading">
                    <div class="room-card-header" id="room-name"></div>
                    <div class="order-dates-wp flex-container sp-between">
                        <div class="order-dates" id="order-dates">
                        </div>
                        <div class="order-time flex-container hor-right">
                            <div class="start-time">с 12.00</div>
                            <div class="end-time">до 12.00</div>
                        </div>
                    </div>
                    <div class="order-checks-taxi">
                       
                    </div>
                </div>
            </div>
    <div class="room-details room-feat-sum flex-container sp-between loading">
                <div class="flex-container vert-center">
                    <span class="feat-header"><span><img src="images/confirm.svg" width="15"> </span> В ваше бронирование входит: </span>
                    <ul class="feat-data">
                        <li>бесплатный wi-fi</li>
                        <li class="feat-delim">⋅</li>
                        <li>бесплатная парковка</li>
                    </ul>
                </div>
                <div class="pay-sum flex-container vert-center">
                    <span class="py-sum-header">Итого: </span>
                    <span class="py-sum-sum" id="summary-price"></span>
                </div>
            </div>
    <div class="room-details flex-container user-data-form loading">
                <div class="user-data-col flex-container sp-between form-info">
                    <div class="simple-wrapper">
                        <label for="name" class="form-label">
                            Имя
                        </label>
                        <div id="name" class="form-input"></div>
                    </div>
                    <div class="simple-wrapper">
                        <label for="number" class="form-label">
                            Телефон
                        </label>
                        <div id="number" class="form-input"></div>
                    </div>
                    <div class="wide-wrapper">
                        <label for="notes" class="form-label">
                            Ваши пожелания:
                        </label>
                        <div id="notes" class="form-notes"></div>
                    </div>
                </div>
                <div class="user-data-col">
                    <div class="simple-wrapper">
                        <label for="surname" class="form-label">
                            Фамилия
                        </label>
                        <div id="surname" class="form-input"></div>
                    </div>
                    <div class="simple-wrapper">
                        <label for="email" class="form-label">
                            @ Электронная почта
                        </label>
                        <div id="email" class="form-input"></div>
                    </div>
                    <div class="simple-wrapper">
                        <label for="humans" class="form-label">
                            Количество взрослых
                        </label>
                        <div id="humans" class="form-input"></div>
                    </div>
                    <div class="simple-wrapper">
                        <label for="children" class="form-label">
                            Количество детей
                        </label>
                        <div id="children" class="form-input"></div>
                    </div>
                </div>
                <div class="user-data-col flex-container hor-center vert-center">
                    <div class="flex-container hor-right confirm-wrapper">
                        <button class="confirm-button" id="confirm-button">Отменить бронирование</button>
                    </div>
                </div>
            </div>
    `;
};

const setMobileVersion = () => {
    document.querySelector('.room-details-wp').innerHTML = `
    <div class="room-details flex-container sp-between">
                <div class="room-card-header" id="room-name"></div>
                <div class="room-card-img-hl flex-container vert-center hor-center marged-bottom">
                    <div class="carousel-wp"></div>
                </div>
                <div class="order-data container">
                    <div class="order-dates-wp flex-container sp-between">
                        <div class="order-dates" id="order-dates">
                        </div>
                        <div class="order-time flex-container hor-right">
                            <div class="start-time">с 12.00</div>
                            <div class="end-time">до 12.00</div>
                        </div>
                    </div>
                </div>
            </div>
    <div class="room-details room-feat-sum loading">
        <div class="pay-sum flex-container sp-between">
            <span class="py-sum-header">Стоимость: </span>
            <span class="py-sum-sum" id="summary-price"></span>
        </div>
    </div>
    <div class="room-details room-feat-feat">
        <div class="flex-container vert-center">
            <div class="feat-header"><span><img src="images/confirm.svg" width="15"></span> В ваше бронирование входит: </div>
            <div class="feat-data">
                <span class="feat-delim">⋅</span>
                <span>бесплатный wi-fi</span>
                <span class="feat-delim">⋅</span>
                <span>бесплатная парковка</span>
            </div>
        </div>
    </div>
    <div class="room-details flex-container hor-left user-data-form loading">
        <div class="simple-wrapper flex-container marged-bottom table">
            <div class="form-label flex-container vert-center table-cell table-cell-1">
                ФИО
            </div>
            <div id="name" class="form-input table-cell"></div>
        </div>
        <div class="simple-wrapper flex-container marged-bottom table">
            <div class="form-label flex-container vert-center table-cell table-cell-1">
                Телефон
            </div>
            <div id="number" class="form-input table-cell"></div>
        </div>
        <div class="simple-wrapper flex-container marged-bottom table">
            <div class="form-label flex-container vert-center table-cell table-cell-1">
                E-mail
            </div>
            <div id="email" class="form-input table-cell"></div>
        </div>
        <div class="simple-wrapper flex-container marged-bottom table">
            <div class="form-label flex-container vert-center table-cell table-cell-1">
                Пожелания:
            </div>
            <div id="notes" class="form-input table-cell"></div>
        </div>
        <div class="simple-wrapper flex-container marged-bottom table">
            <div class="form-label flex-container vert-center table-cell table-cell-1">
                Количество взрослых:
            </div>
            <div id="humans" class="form-input table-cell"></div>
        </div>
        <div class="simple-wrapper flex-container marged-bottom table">
                <div class="form-label flex-container vert-center table-cell table-cell-1">
                Количество детей:
            </div>
            <div id="children" class="form-input table-cell"></div>
        </div>
        <div class="flex-container confirm-wrapper">
            <button class="confirm-button" id="confirm-button">Отменить бронирование</button>
        </div>
    </div>`
};
