let UI = {
    daysArr: ['вс','пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthArr: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    datesObj: null,
    setHotel: function (hotelObj) {
        this.removeHider('hotel-hider');
        let name = document.getElementById('hotel-name');
        let address = document.getElementById('hotel-address');
        let phone = document.getElementById('hotel-number');
        let rank = document.getElementById('hotel-rank');
        let rankNum = document.getElementById('hotel-rank-nums');
        let reviews = document.getElementById('reviews');

        if (!name || !address || !phone || !rank || !rankNum) return;
        name.innerText = hotelObj.name;
        address.innerText = hotelObj.address;
        phone.innerText = hotelObj.phone;
        phone.href = `phoneto:${hotelObj.phone}`;
        rankNum.innerText = hotelObj.rank;
        if (hotelObj.reviews) reviews.innerText = `(${hotelObj.reviews} отзывов)`;

        name.classList.remove('loading');
        address.classList.remove('loading');
        phone.classList.remove('loading');

        rank.innerHTML = '';
        let ranksArray = [];
        for (let i = 0; i < Math.floor(+hotelObj.rank); ++i) {
            ranksArray.push('<img src="../images/full.svg" width="10%" alt="full star">');
        }
        if (hotelObj.rank - Math.floor(+hotelObj.rank) > 0) {
            ranksArray.push('<img src="../images/half.svg" width="10%" alt="half of star">');
        }
        for (let i = 0; i < Math.floor(10 - hotelObj.rank); ++i) {
            ranksArray.push('<img src="../images/empty.svg" width="10%" alt="half of star">');
        }
        rank.innerHTML = ranksArray.join('');
    },

    setDates: function (datesObj)  {
        this.datesObj = datesObj;
        let startDate = document.getElementById('begin-date');
        let endDate = document.getElementById('end-date');
        let daysAmount = document.getElementById('days-amount');

        if (!startDate || !endDate || !daysAmount) return;
        this.removeHider('nav-hider');
        document.querySelector('.book-nav-bar').classList.remove('loading');

        startDate.innerText = this.formatDate(datesObj.start);
        endDate.innerText = this.formatDate(datesObj.end);
        daysAmount.innerText = this.formatDays(datesObj.nights);
        if (this.onHeaderDateSet) this.onHeaderDateSet(datesObj);
    },

    formatDate: function (date) {
        return `${this.daysArr[date.getDay()]}, ${date.getDate()} ${this.monthArr[date.getMonth()]} ${date.getFullYear()} г`
    },

    formatDays: function (days) {
        let word = days + ' ';
        if (Math.floor(days / 10)%10 === 1) return word + 'ночей';
        if (days % 10 === 1) return  word + 'ночь';
        if (days % 10 > 4) return word + 'ночей';
        return word + 'ночи';
    },

    formatNumber: function (number) {
        number = number.toString();
        return number.split('').reverse().map((el, index) => {
            return (index + 1)%3 === 0 && index < number.length - 1? "'" + el : el;
        }).reverse().join('');
    },

    removeHider: function (hiderId) {
        let hider = document.getElementById(hiderId);
        if (hider) hider.remove();
    },

    addOnLoadListener: listener => {
        document.addEventListener("DOMContentLoaded", listener);
    }
};
