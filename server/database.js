const Hotel = require('./models/Hotel'),
    Apartment = require('./models/Apartment'),
    {consoleLog} = require('./logs');

module.exports = () => {
    Hotel.find({}, (err, hotels) => {
        if (err || !hotels) {
            consoleLog("Get hotel error:");
            consoleLog(err);
        }

        if (hotels.length > 0) return;

        const hotel = new Hotel({
            name: "Афинский Квартал",
            email: "info@neuronex.pro",
            address: "пер. Базарный,12 - 634050, Томск",
            phone: "+7 (3822) 94 21 80",
            link: "akvartal",
            site: "https://apartments-kem.ru",
            logo: "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/10/45/1045132_v6.jpeg",
            disableChecker: false,
        });

        hotel.save(e => {
            if (e) {
                consoleLog("Save hotel error:");
                consoleLog(e);
            }

            const apartment = new Apartment({
                hotelId: hotel._id,
                images: ["https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/10/45/1045132_v6.jpeg"],
                name: "Апартаменты - премиум",
                description: "Апартаменты - студия, площадью 35 м2, оборудованные двуспальной кроватью и двуспальным диваном. Описание номера/апартамента.",
                link: "premium",
                price: 1400,
                maxHumans: 4,
                maxChildren: 4,
            });

            apartment.save(e => {
                if (e) {
                    consoleLog("Save hotel error:");
                    consoleLog(e);
                }
            });
        });
    });
};