UI.addOnLoadListener(() => {
    const params = QUERY.params();

    if (!params.token)
        return window.location.replace('/?hotel=' + params.hotel);

    CORE.getHotel(params);

    AJAX.get('/api/reservation', {token: params.token}).then(res => {
        const startText = res.start,
            endText = res.end;

        res.start = CORE.parseDate(res.start);
        res.end = CORE.parseDate(res.end);
        res.nights = CORE.getNights(res.start, res.end);

        res.apartment.start = res.start;
        res.apartment.end = res.end;

        UI.setDates(res);
        UI.setApartment(res.apartment, res.nights);
        UI.setReservation(res);
        UI.setLink('/?hotel=' + params.hotel + '&start=' + startText + '&end=' + endText + '&guests=' + res.humans + '&children=' + res.children);
    });
});

let showPreloader = false;

UI.onCancelReservation = () => {
    if (!confirm("Вы уверены, что хотите отменить бронирование?")) return;
    if (showPreloader) return;

    showPreloader = true;
    const params = QUERY.params();
    AJAX.post('/api/reservation/cancel', {token: params.token}).then(res => {
        window.location.reload(true);
    });
};