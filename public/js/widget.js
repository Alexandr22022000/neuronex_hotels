let start, end;

document.addEventListener('DOMContentLoaded', () => {
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

UI.setDates = function (datesObj) {
    if (!start || !end) return;
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

UI.setGuests = function (humans, children) {
    document.getElementById('children').selectedIndex = children ? children : 0;
    document.getElementById('guests').selectedIndex = humans ? humans - 1 : 0;
};

UI.setLink = function (link) {
    document.querySelector('.widget-subm-button a').href = link;
};
