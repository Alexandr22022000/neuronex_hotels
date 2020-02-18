const parseDate = require('../reservations/parseDate'),
    Hotel = require('../models/Hotel'),
    Apartment = require('../models/Apartment'),
    Reservation = require('../models/Reservation'),
    calcSalePrice = require('../reservations/calcSalePrice'),
    STATUS = require('../constants/reservationStatus'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {start, end, humans, children, hotel} = req.query;

    start = parseDate(start);
    end = parseDate(end);

    if (!hotel || !start || !end)
        return res.status(400).send({message: "Error: start, and and hotel can't be empty"});

    const nights = (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);

    Hotel.findOne({link: hotel}, (err, hotel) => {
        if (err) {
            consoleLog("Get hotel error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get hotel"});
        }

        if (!hotel)
            return res.status(404).send({message: "Error: hotel not found"});

        Reservation.find({
            hotelId: hotel._id,
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

            let selector = reservations.map(reservation => reservation.apartmentId);
            selector = selector.filter((item, pos) => selector.indexOf(item) === pos);
            selector = selector.map(apartmentId => ({_id: {$ne: apartmentId}}));

            if (humans) selector.push({maxHumans: {$gte: humans}});
            if (children) selector.push({maxChildren: {$gte: children}});

            selector = selector.length ? {$and: selector} : {};
            if (hotel.disableChecker) selector = {};

            Apartment.find({hotelId: hotel._id, ...selector}, (err, apartments) => {
                if (err || !apartments) {
                    consoleLog("Get apartments error:");
                    consoleLog(err);
                    return res.status(500).send({message: "Error: can't get apartments"});
                }

                apartments = apartments.map(apartment => ({
                    name: apartment.name,
                    images: apartment.images,
                    description: apartment.description,
                    price: apartment.price,
                    link: apartment.link,
                    maxHumans: apartment.maxHumans,
                    maxChildren: apartment.maxChildren,
                    salePrice: calcSalePrice(apartment.price, nights, apartment.link),
                }));

                res.status(200).send({apartments});
            });
        });
    });
};