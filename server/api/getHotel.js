const Hotel = require('../models/Hotel'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {hotel} = req.query;

    if (!hotel || !hotel.trim())
        return res.status(400).send({message: "Error: hotel can't be empty"});

    Hotel.findOne({link: hotel}, (err, hotel) => {
        if (err) {
            consoleLog("Get hotel error:");
            consoleLog(err);
            return res.status(500).send({message: "Error: can't get hotel"});
        }

        if (!hotel)
            return res.status(404).send({message: "Error: hotel not found"});

        res.status(200).send({
            name: hotel.name,
            address: hotel.address,
            phone: hotel.phone,
            site: hotel.site,
            logo: hotel.logo,
        });
    });
};