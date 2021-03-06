document.addEventListener('DOMContentLoaded', () => {
    document.isNarrow = document.body.clientWidth < 768;
    document.querySelector('.dates-link').href = `${window.location.origin}/${window.location.search}`;
    document.querySelector('.head-second-stg a').href = `${window.location.origin}/apartments${window.location.search}`;
    document.querySelector('.back-button').href = `${window.location.origin}/apartments${window.location.search}`;
    setContent();
});

UI.setApartment = function (obj) {
    if (obj === undefined) return;
    if (obj === null) return;
    this.removeHider('apart-hider');
    document.querySelector('.order-data').classList.remove('loading');
    document.querySelector('.room-details').classList.remove('loading');
    document.querySelector('.room-feat-sum').classList.remove('loading');

    let {name, images, salePrice} = obj;
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

UI.setError = function (errObj) {
    Object.keys(errObj).forEach((el) => {
        let targetInput = document.getElementById(el);
        if (!errObj[el]) {
            removeError(targetInput);
            return;
        }

        if (document.isNarrow) {
            if (targetInput.parentNode.parentNode.querySelector('.error-in-msg')) return;
            targetInput.parentNode.parentNode.appendChild(createErrorElem(errObj[el]));
            targetInput.parentNode.setAttribute('style', 'border: red solid 1px;');
        }
        else {
            if (targetInput.parentNode.querySelector('.error-in-msg')) return;
            targetInput.setAttribute('style', 'border: red solid 1px;');
            targetInput.parentNode.appendChild(createErrorElem(errObj[el]));
        }
    })

};

const createErrorElem = (text) => {
    let elem = document.createElement('div');
    elem.style.color = 'red';
    elem.classList.add('error-in-msg');
    elem.innerText = text;
    return elem;
};

const removeError = (targetInput) => {
    if (document.isNarrow) {
        targetInput.parentNode.removeAttribute('style');
        let elem = targetInput.parentNode.parentNode.querySelector('.error-in-msg');
        if (elem) elem.remove();
    }
    else {
        targetInput.removeAttribute('style');
        let elem = targetInput.parentNode.querySelector('.error-in-msg');
        if (elem) elem.remove();
    }
};

const handleInput = (target, key) => {
    if (UI.onUpdateInput) UI.onUpdateInput(target.value, key);
};

const addEventListeners = () => {
    document.getElementById('name').addEventListener('input', (e) => handleInput(e.target, 'name'));
    document.getElementById('phone').addEventListener('input', (e) => handleInput(e.target, 'phone'));
    document.getElementById('wishes').addEventListener('input', (e) => handleInput(e.target, 'wishes'));
    document.getElementById('email').addEventListener('input', (e) => handleInput(e.target, 'email'));
};

const setContent = () => {
    setTimeout(() => {
        document.getElementById('confirm-button').addEventListener('click', () => {
            if (UI.onFinishReservation) UI.onFinishReservation();
        });
        addEventListeners();
    }, 1);
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
                            <div class="start-time">с: 12.00</div>
                            <div class="end-time">до: 12.00</div>
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
    <div class="room-details flex-container user-data-form">
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
                <div class="user-data-col flex-container sp-evenly">
                    <div class="simple-wrapper">
                        <label for="name" class="form-label">
                            ФИО <span style="color: #de1424">*</span>
                        </label>
                        <input id="name" type="text" class="form-input">
                    </div>
                    <div class="wide-wrapper">
                        <label for="wishes" class="form-label">
                            Ваши пожелания:
                        </label>
                        <textarea id="wishes" class="form-notes"></textarea>
                    </div>
                </div>
                <div class="user-data-col flex-container sp-evenly" >
                    <div class="simple-wrapper marged-bottom">
                        <label for="phone" class="form-label">
                            Телефон <span style="color: #de1424">*</span>
                        </label>
                        <input id="phone" type="tel" class="form-input">
                    </div>
                    <div class="simple-wrapper marged-bottom">
                        <label for="email" class="form-label">
                            @ Электронная почта
                        </label>
                        <input id="email" type="tel" class="form-input">
                        <span style="font-size: 0.7em; font-style: italic">для получения ваучера бронирования</span>
                    </div>
                    <div class="wide-button-wrapper flex-container hor-right confirm-wrapper">
                        <span style="font-size: 0.7em; font-style: italic">Вы сможете редактировать бронирование бесплатно</span>
                        <a target="_self" class="confirm-button unselectable" id="confirm-button">Завершить бронирование!</a>
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
            <div class="feat-header"><span><img src="../images/confirm.svg" width="15"></span> В ваше бронирование входит: </div>
            <div class="feat-data">
                <span class="feat-delim">⋅</span>
                <span>бесплатный wi-fi</span>
                <span class="feat-delim">⋅</span>
                <span>бесплатная парковка</span>
            </div>
        </div>
    </div>
    <div class="room-details flex-container hor-left user-data-form">
        <div class="input-block marged-bottom">
            <div class="simple-wrapper flex-container">
                <div class="form-label flex-container vert-center">
                    ФИО <span style="color: #de1424">*</span>
                </div>
                <input id="name" type="text" class="form-input">
            </div>
        </div>
        <div class="input-block marged-bottom">
            <div class="simple-wrapper flex-container">
                <div class="form-label flex-container vert-center">
                    Телефон <span style="color: #de1424">*</span>
                </div>
                <input id="phone" type="tel" class="form-input">
            </div>
        </div>
        <div class="input-block marged-bottom">
            <div class="simple-wrapper flex-container">
                <div class="form-label flex-container vert-center">
                    E-mail
                </div>
                <input id="email" type="tel" class="form-input">
            </div>
            <span style="font-size: 0.7em; font-style: italic">для получения ваучера бронирования</span>
        </div>
        <div class="input-block marged-bottom">
            <div class="simple-wrapper flex-container">
                <div class="form-label flex-container vert-center">
                    Пожелания:
                </div>
                <input id="wishes" class="form-input">
            </div>
        </div>
        <div class="container confirm-wrapper">
            <a target="_self" class="confirm-button unselectable" id="confirm-button">Завершить бронирование!</a>
            <span style="font-size: 0.7em; font-style: italic">Вы сможете редактировать бронирование бесплатно</span>
        </div>
    </div>`
};
