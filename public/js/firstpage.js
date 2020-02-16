let start, end;
let byUser = false;

const getDayDate = (date) => {
    let minDate;
    if (!date) {
        minDate = new Date();
        minDate.setHours(0);
        minDate.setMinutes(0);
        minDate.setSeconds(0);
        minDate.setMilliseconds(0);
    }
    else {
        minDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
    }

    return minDate
};

const toDaysArray = (beginDate, endDate) => {
    let arr = [];
    beginDate = getDayDate(beginDate);
    endDate = getDayDate(endDate);
    while (beginDate.getTime() <= endDate.getTime()) {
        arr.push(getDayDate(beginDate));
        beginDate.setTime(beginDate.getTime()+1000*60*60*24);
    }
    return arr;
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.widget-subm-button a').href = `${window.location.origin}/apartments`;
    document.querySelector('.head-second-stg a').href = `${window.location.origin}/apartments`;

    document.isNarrow = document.body.clientWidth < 768;
    let mindate = getDayDate();
    if (!isMobileOS()) {
        let startDateElem = document.getElementById('start-date');
        let endDateElem = document.getElementById('end-date');

        start = new Datepicker('#start-date', {
            ranged: true,
            onChange: function (dates) {
                if (dates.length) {
                    startDateElem.value = UI.formatDate(dates[0]);
                    if (byUser) {
                        if (UI.onUpdateDate) UI.onUpdateDate(dates[0], 'start');
                        if (UI.onUpdateDate) UI.onUpdateDate(dates[dates.length - 1], 'end');
                    }
                }
            },
            onRender: () => {
                byUser = true;
            },
            min: mindate
        });
        end =  new Datepicker('#end-date', {
            onChange: function (date) {
                if (!date) return;
                endDateElem.value = UI.formatDate(date);

                if (!byUser) return;
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'end');
            },
            onRender: () => {
                byUser = true;
            },
            min: mindate
        });
    }
    else {
        start = document.getElementById('start-date');
        start.setAttribute('type', 'date');
        start.addEventListener('input', (e) => {
            if (UI.onUpdateDate) UI.onUpdateDate(new Date(e.target.value), 'start');
        });

        end = document.getElementById('end-date');
        end.setAttribute('type', 'date');
        end.addEventListener('input', (e) => {
            if (UI.onUpdateDate) UI.onUpdateDate(new Date(e.target.value), 'end');
        })
    }

    if (!document.isNarrow) {
        document.getElementById('children').addEventListener('change', function(e) {
            if (UI.onUpdateGuests) UI.onUpdateGuests(e.target.selectedIndex, 'children');
        });
        document.getElementById('guests').addEventListener('change', function(e) {
            if (UI.onUpdateGuests) UI.onUpdateGuests(e.target.selectedIndex, 'guests');
        });
    }
});

QUERY.onQueryUpdate = () => {
    updateSecondStepHref();
};

const updateSecondStepHref = () => {
    document.querySelector('.widget-subm-button a').href = `${window.location.origin}/apartments${window.location.search}`;
    document.querySelector('.head-second-stg a').href = `${window.location.origin}/apartments${window.location.search}`;
};

UI.setDates = function (datesObj) {
    updateHeadersDates(datesObj.start, datesObj.end, datesObj.nights);

    if (isMobileCachedResult) {
        start.value = new Date(datesObj.start - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
        end.value = new Date(datesObj.end - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
    }
    else {
        byUser = false;
        start.isManualSet = true;
        end.isManualSet = true;
        start.setDate(toDaysArray(datesObj.start, datesObj.end));
        end.setDate(datesObj.end);
    }
};

const updateHeadersDates = (beginDate, endDate, days) => {
    let startDateElem = document.getElementById('header-begin-date');
    let endDateElem = document.getElementById('header-end-date');
    let daysAmount = document.getElementById('days-amount');
    if (!startDateElem || !endDateElem || !daysAmount) return;

    UI.removeHider('nav-hider');
    document.querySelector('.book-nav-bar').classList.remove('loading');

    startDateElem.innerText = UI.formatDate(beginDate);
    endDateElem .innerText = UI.formatDate(endDate);
    daysAmount.innerText = UI.formatDays(days);
};

UI.setGuests = function (humans, children) {
    document.getElementById('children').selectedIndex = children ? children : 0;
    document.getElementById('guests').selectedIndex = humans ? humans - 1 : 0;
};

UI.setLink = function (link) {
    document.querySelector('.widget-subm-button a').href = link;
};
