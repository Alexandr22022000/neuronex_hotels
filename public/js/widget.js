document.addEventListener('DOMContentLoaded', () => {
    document.isMobile = document.body.clientWidth < 768;
    if (!document.isMobile) {
        const start = datepicker('#start-date', {
            id: 1,
            minDate: new Date(),
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'start');
            }
        });
        const end = datepicker('#end-date', {
            id: 1,
            formatter: (input, date, instance) => {
                input.value = date.toLocaleDateString(); // => '1/1/2099'
                if (UI.onUpdateDate) UI.onUpdateDate(date, 'end');
            }
        });
    }
    else {
        let start = document.getElementById('start-date');
        start.setAttribute('type', 'date');
        start.addEventListener('input', (e) => {
            if (UI.onUpdateDate) UI.onUpdateDate(new Date(e.target.value), 'start');
        });

        let end = document.getElementById('end-date');
        end.setAttribute('type', 'date');
        end.addEventListener('input', (e) => {
            if (UI.onUpdateDate) UI.onUpdateDate(new Date(e.target.value), 'start');
        })
    }
});
