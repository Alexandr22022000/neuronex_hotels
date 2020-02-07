document.addEventListener("DOMContentLoaded", () => {
    UI.setHotel({name: "A Kvartal", phone: "88005553535", address: "Prague, Apple street 12", rank: 9.5});
    UI.setDates({start: new Date(), end: new Date(Date.now() + 2*24*60*60*1000), nights: 2});
    UI.setApartments([{name: "Premium apartment", price: 1400, salePrice: 2000, images: ['https://redevelopmentconstruction.com/wp-content/uploads/2017/11/home-slider-construction-WordPress-theme-apt-on-sale-1.jpg', 'https://im.proptiger.com/1/1584451/6/empire-elevation-11178767.jpeg'], link:'/finish', description: "This is description!"}], 2);
});

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
    })
});
