const Reservation = require('../models/Reservation'),
    Apartment = require('../models/Apartment'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {token} = req.query;

    if (!token || !token.trim())
        return res.status(400).send({message: "Error: hotel can't be empty"});

    Reservation.findOne({token}, (err, reservation) => {
        if (err) {
            consoleLog("Get reservation error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get reservation"});
        }

        if (!reservation)
            return res.status(404).send({message: "Error: reservation not found"});

        Apartment.findOne({_id: reservation.apartmentId}, (err, apartment) => {
            if (err || !apartment) {
                consoleLog("Apartment not found error:");
                consoleLog(err);
                return res.status(500).send({message: "Error: apartment not found"});
            }

            res.status(200).send({
                apartment: {
                    images: apartment.images,
                    name: apartment.name,
                    description: apartment.description,
                    salePrice: reservation.price,
                },
                start: reservation.start,
                end: reservation.end,
                name: reservation.name,
                phone: reservation.phone,
                email: reservation.email,
                wishes: reservation.wishes,
                price: reservation.price,
                humans: reservation.humans,
                children: reservation.children,
                status: reservation.status,
            });
        });
    });
};