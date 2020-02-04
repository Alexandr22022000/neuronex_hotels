let start, end;

document.addEventListener('DOMContentLoaded', () => {
    document.isNarrow = document.body.clientWidth < 768;
    if (!document.isNarrow) {
        start = datepicker('#start-date', {
            id: 1,
            minDate: new Date(),
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'start');
            }
        });
        end = datepicker('#end-date', {
            id: 1,
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
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
    if (document.isNarrow) {
        start.value = new Date(datesObj.start - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
        end.value = new Date(datesObj.end - datesObj.start.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);
        if (UI.onUpdateDate) UI.onUpdateDate(new Date(start.value), 'start');
        if (UI.onUpdateDate) UI.onUpdateDate(new Date(end.value), 'end');
    }
    else {
        start.setDate(datesObj.start);
        end.setDate(datesObj.end);
    }
};
