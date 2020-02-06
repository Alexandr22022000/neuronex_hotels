document.addEventListener("DOMContentLoaded", () => {
    UI.setHotel({name: "A Kvartal", phone: "88005553535", address: "Prague, Apple street 12", rank: 9.5});
    UI.setDates({start: new Date(), end: new Date(Date.now() + 2*24*60*60*1000), nights: 2});
    UI.setApartment({name: "Premium apartment", price: 1400, salePrice: 2000, images: ['https://redevelopmentconstruction.com/wp-content/uploads/2017/11/home-slider-construction-WordPress-theme-apt-on-sale-1.jpg', 'https://im.proptiger.com/1/1584451/6/empire-elevation-11178767.jpeg'], link:'/premium', description: "This is description!"}, 2);
    UI.setReservation({name: "Alex", phone: "88005553535", email: "info@neuronex.pro", wishes: 'asdasfsdfjsdgf fgdfg dhdfad ddaewqd d qwdqwdqw rerwqdwdfserq wesedefsr erewefe wr ewr erwer w', status: 'CANCELED', humans: 2, children: 0});
});

UI.onCancelReservation = () => console.log("AAAA");
