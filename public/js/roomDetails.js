document.addEventListener('DOMContentLoaded', () => {
    document.isMobile = document.body.clientWidth < 768;
    setContent();
});

UI.setApartment = function (obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('apart-hider');
    this.removeHider('user-data-hider');
    document.querySelector('.order-data').classList.remove('loading');
    document.querySelector('.room-details').classList.remove('loading');
    document.querySelector('.room-feat-sum').classList.remove('loading');
    document.querySelector('.user-data-form').classList.remove('loading');

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

UI.setError = function (errObj) {
    let elem = document.createElement('span');
    elem.style.color = 'red';
    elem.innerText = errObj[Object.keys(errObj)[0]];
    document.getElementById(Object.keys(errObj)[0]).parentNode.appendChild(elem);
};

const handleInput = (value, key) => {
    if (UI.onUpdateInput) UI.onUpdateInput(value, key);
};

const addEventListeners = () => {
    document.getElementById('name').addEventListener('input', (e) => handleInput(e.target.value, 'name'));
    document.getElementById('phone').addEventListener('input', (e) => handleInput(e.target.value, 'phone'));
    document.getElementById('wishes').addEventListener('input', (e) => handleInput(e.target.value, 'wishes'));
    document.getElementById('email').addEventListener('input', (e) => handleInput(e.target.value, 'email'));
    let surname = document.getElementById('surname');
    if (surname) surname.addEventListener('input', (e) => handleInput(e.target.value, 'surname'));
};

const setContent = () => {
    setTimeout(() => {
        document.getElementById('confirm-button').addEventListener('click', () => {
            if (UI.onFisishReservation) UI.onFisishReservation();
        });
        addEventListeners();
    }, 1);
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
                        <div>
                            <label>
                                <input type="checkbox">
                                Добавить такси от вокзала (или по городу) +150 ₽
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox">
                                Добавить такси от аэропорта +450 ₽
                            </label>
                        </div>
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
                    <div class="form-info-instr">
                        Почти готово! Просто заполните <br>
                        <span style="color: #de1424">*</span> обязательные поля.
                    </div>
                    <div class="form-info-uagr">
                        Совершая это бронирование, я принимаю<br>
                        <a href="#">условия бронирования</a>, <a href="#">общие условия</a><br>
                        и <a href="#">положение о конфиденциальности</a>.
                    </div>
                </div>
                <div class="user-data-col">
                    <div class="simple-wrapper">
                        <label for="name" class="form-label">
                            Имя <span style="color: #de1424">*</span>
                        </label>
                        <input id="name" type="text" class="form-input">
                    </div>
                    <div class="simple-wrapper">
                        <label for="phone" class="form-label">
                            Телефон <span style="color: #de1424">*</span>
                        </label>
                        <input id="phone" type="tel" class="form-input">
                    </div>
                    <div class="wide-wrapper">
                        <label for="wishes" class="form-label">
                            Ваши пожелания:
                        </label>
                        <textarea id="wishes" class="form-notes"></textarea>
                    </div>
                </div>
                <div class="user-data-col" >
                    <div class="simple-wrapper">
                        <label for="surname" class="form-label">
                            Фамилия <span style="color: #de1424">*</span>
                        </label>
                        <input id="surname" type="text" class="form-input">
                    </div>
                    <div class="simple-wrapper">
                        <label for="email" class="form-label">
                            @ Электронная почта
                        </label>
                        <input id="email" type="tel" class="form-input">
                        <span style="font-size: 0.7em; font-style: italic">для получения ваучера бронирования</span>
                    </div>
                    <div class="wide-wrapper flex-container hor-right confirm-wrapper">
                        <span style="font-size: 0.7em; font-style: italic">Вы сможете редактировать бронирование бесплатно</span>
                        <button class="confirm-button" id="confirm-button">Завершить бронирование!</button>
                    </div>
                </div>
            </div>
    `;
};

const setMobileVersion = () => {
    document.querySelector('.room-details-wp').innerHTML = `
    <div class="room-details flex-container sp-between">
                <div class="room-card-header" id="room-name"></div>
                <div class="room-card-img-hl flex-container vert-center hor-center">
                    <div class="carousel-wp loading"></div>
                </div>
                <div class="order-data container loading">
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
        <div class="simple-wrapper flex-container marged-bottom">
            <div class="form-label flex-container vert-center">
                ФИО <span style="color: #de1424">*</span>
            </div>
            <input id="name" type="text" class="form-input">
        </div>
        <div class="simple-wrapper flex-container marged-bottom">
            <div class="form-label flex-container vert-center">
                Телефон <span style="color: #de1424">*</span>
            </div>
            <input id="phone" type="tel" class="form-input">
        </div>
        <div class="simple-wrapper flex-container">
            <div class="form-label flex-container vert-center">
                E-mail
            </div>
            <input id="email" type="tel" class="form-input">
        </div>
        <span style="font-size: 0.7em; font-style: italic" class="marged-bottom">для получения ваучера бронирования</span>
        <div class="simple-wrapper flex-container marged-bottom">
            <div class="form-label flex-container vert-center">
                Пожелания:
            </div>
            <input id="wishes" class="form-input">
        </div>
        <div class="flex-container confirm-wrapper">
            <button class="confirm-button" id="confirm-button">Завершить бронирование!</button>
            <span style="font-size: 0.7em; font-style: italic">Вы сможете редактировать бронирование бесплатно</span>
        </div>
    </div>`
};
