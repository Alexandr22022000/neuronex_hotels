UI.addOnLoadListener(() => {
    const params = QUERY.params();

    CORE.getHotel(params);

    const dates = CORE.getDates(params);
    const guests = CORE.getGuests(params);
    UI.setDates(dates);

    AJAX.get('/api/apartments', {
        start: CORE.stringifyDate(dates.start),
        end: CORE.stringifyDate(dates.end),
        humans: guests.guests,
        children: guests.children,
        hotel: params.hotel,
    }).then(res => {
        res.apartments = res.apartments.map(apartment => ({...apartment, link: '/finish' + window.location.search + '&apartment=' + apartment.link}));
        UI.setApartments(res.apartments, dates.nights);
    });
});
