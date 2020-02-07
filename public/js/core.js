let dateToday = new Date();
dateToday = new Date(Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), 10, 0, 0));

const CORE = {
    parseDate: dateString => {
        if (!dateString) return null;

        try {
            dateString = dateString.match(/([0-9]+).([0-9]+).([0-9]+)/);
            if (!dateString || dateString.length !== 4) return null;

            return new Date(Date.UTC(+dateString[1], +dateString[2], +dateString[3], 10, 0, 0));
        }
        catch (e) {
            return null;
        }
    },

    stringifyDate: date => {
        return date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
    },

    getNights: (start, end) => {
        const oneDay = 1000 * 60 * 60 * 24;
        let visitingTime = end.getTime() - start.getTime();
        visitingTime = visitingTime / oneDay;
        return visitingTime - (visitingTime % 1);
    },

    getDates: params => {
        let start = CORE.parseDate(params.start),
            end = CORE.parseDate(params.end);

        return CORE.updateDates(start, end);
    },

    updateDates: (start, end) => {
        if (!start) start = dateToday;
        if (!end) end = dateToday;

        if (start.getTime() < dateToday.getTime())
            start = dateToday;

        if (end.getTime() <= start.getTime())
            end = new Date(start.getTime() + 24*60*60*1000);

        QUERY.set({start: CORE.stringifyDate(start), end: CORE.stringifyDate(end)});
        return {start, end, nights: CORE.getNights(start, end)};
    },

    getGuests: params => {
        let guests = 1,
            children = 0;

        if (params.guests) {
            try {
                guests = +params.guests;
            } catch (e) {}
        }
        if (params.children) {
            try {
                children = +params.children;
            } catch (e) {}
        }

        QUERY.set({guests, children});
        return {guests, children};
    },

    getHotel: params => {
        if (!params.hotel) return alert("Отель не найден! Попробуйте перейти на сайт отеля и забронировать заново");

        AJAX.get('/api/hotel', {hotel: params.hotel}).then(res => {
            res.rank = 10;
            res.reviews = 27;
            UI.setHotel(res);
        });
    },
};