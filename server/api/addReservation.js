const parseDate = require('../reservations/parseDate'),
    Hotel = require('../models/Hotel'),
    Apartment = require('../models/Apartment'),
    Reservation = require('../models/Reservation'),
    calcSalePrice = require('../reservations/calcSalePrice'),
    thankForReservation = require('../emails/newReservationClient'),
    newReservation = require('../emails/newReservationHotel'),
    STATUS = require('../constants/reservationStatus'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {start, end, humans, children, apartment, name, phone, email, wishes} = req.body;

    start = parseDate(start);
    end = parseDate(end);

    if (!apartment || !start || !end || !name || !name.trim() || !phone || !phone.trim())
        return res.status(400).send({message: "Error: start, and, name, phone and apartment can't be empty"});

    const nights = (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);

    Apartment.findOne({link: apartment}, (err, apartment) => {
        if (err) {
            consoleLog("Get apartment error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get apartment"});
        }

        if (!apartment)
            return res.status(404).send({message: "Error: apartment not found"});

        Reservation.find({
            apartmentId: apartment._id,
            status: {$ne: STATUS.CANCELED},
            $or: [
                {start: {$gte: start, $lt: end}},
                {end: {$gt: start, $lte: end}},
                {start: {$lte: start}, end: {$gte: end}},
            ],
        }, (err, reservations) => {
            if (err || !reservations) {
                consoleLog("Get reservations error:");
                consoleLog(err);
                return res.status(500).send({message: "Error: can't get reservations"});
            }

            if (reservations.length)
                return res.status(200).send({message: "Apartment already not available"});

            const reservation = new Reservation({
                hotelId: apartment.hotelId,
                apartmentId: apartment._id,
                start,
                end,
                name,
                phone,
                email,
                wishes,
                price: calcSalePrice(apartment.price, nights, apartment.link),
                humans,
                children,
            });

            reservation.save(e => {
                if (e) {
                    consoleLog("Save reservation error:");
                    consoleLog(e);
                    return res.status(500).send({message: "Error: can't save reservation"});
                }

                Hotel.findOne({_id: apartment.hotelId}, (err, hotel) => {
                    if (err || !hotel) {
                        consoleLog("Hotel not found error:");
                        consoleLog(err);
                        return res.status(500).send({message: "Error: hotel not found"});
                    }

                    if (email)
                        thankForReservation(email, reservation, apartment, hotel);


                    newReservation(hotel.email, reservation, apartment, hotel).then(() => {
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