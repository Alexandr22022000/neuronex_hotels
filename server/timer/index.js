const Reservation = require('../models/Reservation'),
    Hotel = require('../models/Hotel'),
    Apartment = require('../models/Apartment'),
    STATUS = require('../constants/reservationStatus'),
    reservationComingClient = require('../emails/reservationComingClient'),
    reservationComingHotel = require('../emails/reservationComingHotel'),
    {consoleLog} = require('../logs');

const startTimer = (callback) => {
    const currentDate = new Date();
    let day = currentDate.getDate();
    if (currentDate.getUTCHours() >= 11) day += 1;

    const updateTime = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), day, 11, 0, 0);

    setTimeout(() => {
        callback();
        startTimer(callback);
    }, updateTime - Date.now() + 1000);
};

module.exports = () => {
    startTimer(updateTime => {
        const nexUpdateTime = new Date();
        nexUpdateTime.setDate(nexUpdateTime.getDate() + 1);

        Reservation.find({status: STATUS.ACTIVE, start: {$lte: updateTime}}, (err, reservations) => {
            if (err || !reservations) {
                consoleLog("Get reservations error:");
                return consoleLog(err);
            }

            reservations.forEach(reservation => {
                reservation.status = STATUS.SOON;
                reservation.save();

                Hotel.findOne({_id: reservation.hotelId}, (err, hotel) => {
                    if (err || !hotel) {
                        consoleLog("Get hotel error:");
                        return consoleLog(err);
                    }

                    Apartment.findOne({_id: reservation.apartmentId}, (err, apartment) => {
                        if (err || !apartment) {
                            consoleLog("Get apartment error:");
                            return consoleLog(err);
                        }

                        if (reservation.email)
                            reservationComingClient(reservation.email, reservation, apartment, hotel);

                        reservationComingHotel(hotel.email, reservation, hotel).catch(e => {
                            consoleLog("Send message error:");
                            return consoleLog(e);
                        });
                    });
                });
            });
        });
    });
};