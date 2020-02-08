const DOMAIN = "https://hotels.neuronex.pro";

UI.addOnLoadListener(() => {
    const params = QUERY.params();

    const dates = CORE.getDates(params);
    UI.setDates(dates);
    UI.setLink(DOMAIN + "/apartments" + window.location.search);

    const guests = CORE.getGuests(params);
    UI.setGuests(guests.guests, guests.children);
});

UI.onUpdateDate = (value, key) => {
    value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), 10, 0, 0));
    const params = QUERY.params();
    let dates = {
        start: CORE.parseDate(params.start),
        end: CORE.parseDate(params.end),
    };

    dates[key] = value;
    dates = CORE.updateDates(dates.start, dates.end);
    UI.setDates(dates);
    UI.setLink(DOMAIN + "/apartments" + window.location.search);
};

UI.onUpdateGuests = (value, key) => {
    const params = QUERY.params();
    const guests = CORE.getGuests(params);

    guests[key] = value;
    QUERY.set(guests);
    UI.setGuests(guests.guests, guests.children);
    UI.setLink(DOMAIN + "/apartments" + window.location.search);
};
