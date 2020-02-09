UI.setApartment = function (obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('apart-hider');
    document.querySelector('.order-data').classList.remove('loading');
    document.querySelector('.room-details').classList.remove('loading');
    document.querySelector('.room-feat-sum').classList.remove('loading');

    let {name, description, images, price, salePrice} = obj;
    document.getElementById('room-name').innerText = name;
    document.getElementById('summary-price').innerText = this.formatNumber(salePrice) + ' ₽';

    if (this.datesObj) setDatesToApartmentData(this.datesObj);

    let carousel = document.querySelector('.carousel-wp');
    carousel.classList.remove('loading');
    carousel.innerHTML = '';
    carousel.appendChild(createCarouselBlock({images}));
};

const setDatesToApartmentData = (datesObj) => {
    let dateStart = datesObj.start;
    let dateEnd = datesObj.end;
    document.getElementById('order-dates').innerHTML =
        `Заезд - ${dateStart.getDate()} ${UI.monthArr[dateStart.getMonth()]} ${dateStart.getFullYear()} г <br>` +
        `Выезд - ${dateEnd.getDate()} ${UI.monthArr[dateEnd.getMonth()]} ${dateEnd.getFullYear()} г`;
};

UI.onHeaderDateSet = (datesObj) => setDatesToApartmentData(datesObj);

const setPropertyValue = (value, propId) => {
    let elem = document.getElementById(propId);
    if (document.isNarrow) {
        if (value) {
            elem.parentNode.removeAttribute('style');
            elem.innerText = value;
        }
        else elem.parentNode.setAttribute('style', 'display: none!important');
    }
    else {
        if (value) {
            elem.parentNode.parentNode.removeAttribute('style');
            elem.innerText = value;
        }
        else elem.parentNode.parentNode.setAttribute('style', 'display: none!important');
    }
};

const updateStatus = (status) => {
    if(status === 'CANCELED') {
        document.getElementById('deny-button').setAttribute('style', 'display: none!important');
        let nav;
        if (document.isNarrow) {
            nav = document.querySelector('.book-nav-bar');
            nav.classList.add('flex-container');
            nav.classList.add('vert-center');
            nav.classList.add('no-reserv');
        }
        else {
            nav = document.querySelector('.book-nav-bar');
            nav.classList.remove('sp-between');
            nav.classList.add('vert-center');
            nav.classList.add('no-reserv');
        }

        nav.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px">ВАШЕ БРОНИРОВАНИЕ ОТМЕНЕНО</div> 
            <div style="text-align: center; width: 60%"><a class="confirm-button unselectable" style="display: block" id="confirm-reserv" target="_self">Забронировать заново</a></div>
        `;
        nav.setAttribute('style', 'background-color: #f74a4a; color: #fffdfd; flex-direction: column')
    }
};

UI.setReservation = function(obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('user-data-hider');

    setPropertyValue(obj.name, 'name');
    setPropertyValue(obj.phone, 'phone');
    setPropertyValue(obj.email, 'email');
    setPropertyValue(obj.wishes, 'wishes');
    setPropertyValue(obj.humans, 'humans');
    setPropertyValue(obj.children, 'children');

    updateStatus(obj.status);

    document.querySelector('.user-data-form').classList.remove('loading');
};

UI.setLink = function (link) {
    let el = document.getElementById('confirm-reserv');
    if (el) el.href = link;
};

document.addEventListener('DOMContentLoaded', () => {
    document.isNarrow = document.body.clientWidth < 768;

    setContent();
    setTimeout(() => {
        document.getElementById('deny-button').addEventListener('click', event => {
            if (UI.onCancelReservation) UI.onCancelReservation();
        });
    }, 1);
});

const setContent = () => {
    if (!document.isNarrow) setDesktopVersion();
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
                    <span class="feat-header"><span><img src="../images/confirm.svg" width="15"> </span> В ваше бронирование входит: </span>
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
                <div class="user-data-col1 flex-container sp-between form-info">
                    <div class="input-block marged-bottom">
                        <div class="simple-wrapper">
                            <label for="name" class="form-label">
                                Имя
                            </label>
                            <div id="name" class="form-input"></div>
                        </div>
                    </div>
                    <div class="input-block marged-bottom">
                        <div class="simple-wrapper">
                            <label for="phone" class="form-label">
                                Телефон
                            </label>
                            <div id="phone" class="form-input"></div>
                        </div>
                    </div>
                    <div class="input-block-wide marged-bottom">
                        <div class="wide-wrapper">
                            <label for="wishes" class="form-label">
                                Ваши пожелания:
                            </label>
                            <div id="wishes" class="form-notes"></div>
                        </div>
                    </div>
                     <div class="input-block marged-bottom">
                        <div class="simple-wrapper">
                            <label for="email" class="form-label">
                                @ Электронная почта
                            </label>
                            <div id="email" class="form-input"></div>
                        </div>
                    </div>
                     <div class="input-block marged-bottom">
                        <div class="simple-wrapper">
                            <label for="humans" class="form-label">
                                Количество взрослых
                            </label>
                            <div id="humans" class="form-input"></div>
                        </div>
                    </div>
                    <div class="input-block marged-bottom">
                        <div class="simple-wrapper">
                            <label for="children" class="form-label">
                                Количество детей
                            </label>
                            <div id="children" class="form-input"></div>
                        </div>
                    </div>
                </div>
                
                <div class="user-data-col flex-container hor-center vert-center">
                    <div class="flex-container hor-right confirm-wrapper unselectable">
                        <button class="deny-button" id="deny-button">Отменить бронирование</button>
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
            <div class="feat-header"><span><img src="../images/confirm.svg" width="15"></span> В ваше бронирование входит: </div>
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
            <div id="phone" class="form-input table-cell"></div>
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
            <div id="wishes" class="form-input table-cell"></div>
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
        <div class="container confirm-wrapper unselectable">
            <button class="deny-button" id="deny-button">Отменить бронирование</button>
        </div>
    </div>`
};
