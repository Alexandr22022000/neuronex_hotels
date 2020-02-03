const getApartments = require('./api/getApartments'),
    addReservation = require('./api/addReservation'),
    getApartment = require('./api/getApartment'),
    getReservation = require('./api/getReservation'),
    getHotel = require('./api/getHotel'),
    cancelReservation = require('./api/cancelReservation');

module.exports = app => {
    app.get('/api/apartments', getApartments);
    app.get('/api/apartment', getApartment);
    app.get('/api/hotel', getHotel);
    app.get('/api/reservation', getReservation);
    app.post('/api/reservation', addReservation);
    app.post('/api/reservation/cancel', cancelReservation);
};