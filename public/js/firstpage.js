let start, end;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.widget-subm-button a').href = `${window.location.origin}/apartments`;
    document.querySelector('.head-second-stg a').href = `${window.location.origin}/apartments`;

    document.isNarrow = document.body.clientWidth < 768;

    if (!isMobileOS()) {
        start = datepicker('#start-date', {
            id: 1,
            minDate: new Date(),
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
                if (instance.isManualSet) {
                    instance.isManualSet = false;
                    return;
                }
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'start');
            }
        });
        end = datepicker('#end-date', {
            id: 1,
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
                if (instance.isManualSet) {
                    instance.isManualSet = false;
                    return;
                }
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'end');
            }
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
});

const updateSecondStepHref = () => {
    document.querySelector('.widget-subm-button a').href = `${window.location.origin}/apartments${window.location.search}`;
};

UI.setDates = function (datesObj) {
    this.dateObject = datesObj;

    updateHeadersDates(datesObj.start, datesObj.end, datesObj.nights);

    if (isMobileCachedResult) {
        start.value = new Date(datesObj.start - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
        end.value = new Date(datesObj.end - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
    }
    else {
        start.isManualSet = true;
        end.isManualSet = true;
        start.setDate(datesObj.start);
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
