const Apartment = require('../models/Apartment'),
    parseDate = require('../reservations/parseDate'),
    calcSalePrice = require('../reservations/calcSalePrice'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {link, start, end} = req.query;

    start = parseDate(start);
    end = parseDate(end);

    if (!link || !link.trim() || !start || !end)
        return res.status(400).send({message: "Error: link, start or end can't be empty"});

    const nights = (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);

    Apartment.findOne({link}, (err, apartment) => {
        if (err) {
            consoleLog("Get apartment error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get apartment"});
        }

        if (!apartment)
            return res.status(404).send({message: "Error: apartment not found"});

        res.status(200).send({
            images: apartment.images,
            name: apartment.name,
            description: apartment.description,
            price: apartment.price,
            salePrice: calcSalePrice(apartment.price, nights, apartment.link),
        });
    });
};