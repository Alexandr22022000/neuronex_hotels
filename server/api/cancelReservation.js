const Reservation = require('../models/Reservation'),
    Hotel = require('../models/Hotel'),
    Apartment = require('../models/Apartment'),
    canceledReservationClient = require('../emails/canceledReservationClient'),
    canceledReservationHotel = require('../emails/canceledReservationHotel'),
    STATUS = require('../constants/reservationStatus'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    const {token} = req.body;

    if (!token || !token.trim())
        return res.status(400).send({message: "Error: token can't be empty"});

    Reservation.findOne({token}, (err, reservation) => {
        if (err) {
            consoleLog("Get reservation error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get reservation"});
        }

        if (!reservation)
            return res.status(404).send({message: "Error: reservation not found"});

        if (reservation.status === STATUS.CANCELED)
            return res.status(200).send({message: "Reservation already canceled"});

        if (reservation.status !== STATUS.SOON && reservation.status !== STATUS.ACTIVE)
            return res.status(200).send({message: "Reservation not available"});

        reservation.status = STATUS.CANCELED;
        reservation.save(e => {
            if (e) {
                consoleLog("Save reservation error:");
                consoleLog(e);
                return res.status(500).send({message: "Error: can't save reservation"});
            }

            Hotel.findOne({_id: reservation.hotelId}, (err, hotel) => {
                if (err || !hotel) {
                    consoleLog("Hotel not found error:");
                    consoleLog(err);
                    return res.status(500).send({message: "Error: hotel not found"});
                }

                Apartment.findOne({_id: reservation.apartmentId}, (err, apartment) => {
                    if (err || !apartment) {
                        consoleLog("Apartment not found error:");
                        consoleLog(err);
                        return res.status(500).send({message: "Error: apartment not found"});
                    }

                    if (reservation.email)
                        canceledReservationClient(reservation.email, reservation, apartment, hotel);

                    canceledReservationHotel(hotel.email, reservation, apartment, hotel).then(() => {
                        res.status(200).send({token: reservation.token});
                    }).catch(e => {
                        consoleLog("Can't send email to hotel:");
                        consoleLog(e);
                        res.status(500).send({message: "Error: can't send email to hotel"});
                    });
                });
            });
        });
    });
};