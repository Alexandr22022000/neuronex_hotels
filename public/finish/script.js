document.addEventListener("DOMContentLoaded", () => {
    UI.setHotel({name: "A Kvartal", phone: "88005553535", address: "Prague, Apple street 12", rank: 9.5});
    UI.setDates({start: new Date(), end: new Date(Date.now() + 2*24*60*60*1000), days: 2});
    UI.setApartment({name: "Premium apartment", price: 1400, salePrice: 2000, images: ['https://www.destinationtips.com/wp-content/uploads/2017/07/hotel-room.jpg', 'https://www.destinationtips.com/wp-content/uploads/2017/07/hotel-room.jpg'], link:'/premium', description: "This is description!"}, 2);
    UI.setError({email: "Incorrect email"});
});

UI.onUpdateInput = (value, key) => console.log(value, key);
UI.onFisishReservation = () => console.log("AAAA");