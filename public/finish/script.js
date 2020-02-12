UI.addOnLoadListener(() => {
    const params = QUERY.params();

    if (!params.apartment)
        return window.location.replace('/apartments' + window.location.search);

    CORE.getHotel(params);
    const dates = CORE.getDates(params);
    UI.setDates(dates);

    AJAX.get('/api/apartment', {
        start: CORE.stringifyDate(dates.start),
        end: CORE.stringifyDate(dates.end),
        link: params.apartment,
    }).then(res => {
        UI.setApartment(res, dates.nights);
    });
});

const reservation = {
    name: "",
    phone: "",
    email: "",
    wishes: "",
};

let showPreloader = false;

const validator = {
    name: value => {
        if (!value || !value.trim()) return "Введите имя";
        return null;
    },

    phone: value => {
        if (!value || !value.trim()) return "Введите телефон";
        return null;
    },

    email: value => {
        if (!value || !value.trim()) return;
        if (!/\S+@\S+\.\S+/.test(value)) return "Введите существующий email";
        return null;
    },

    wishes: value => null,
};

UI.onUpdateInput = (value, key) => {
    reservation[key] = value;
    UI.setError({[key]: validator[key](value)});
};

UI.onFinishReservation = () => {
    if (showPreloader) return;

    const errors = {};
    let isError = false;
    for (let key in reservation) {
        errors[key] = validator[key](reservation[key]);
        if (errors[key]) isError = true;
    }

    UI.setError(errors);
    if (isError) return;

    showPreloader = true;
    UI.showPreloader(true);
    const params = QUERY.params();
    AJAX.post('/api/reservation', {
        start: params.start,
        end: params.end,
        humans: params.guests,
        children: params.children,
        apartment: params.apartment,
        ...reservation,
    }).then(res => {
        window.location.replace('/reservation?token=' + res.token + '&hotel=' + params.hotel);
    });
};
