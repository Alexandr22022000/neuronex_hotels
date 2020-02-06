let QUERY = {
    paramsToKeyval: (str) => {
        let result = {};
        str.split(/[&;]/).forEach(el => {
            let keyvalArr = el.split('=');
            result[keyvalArr[0]] = keyvalArr[1];
        });
        return result;
    },

    paramsToString: (keyvals) => {
        return Object.keys(keyvals).map(el => {
            return `${el}=${keyvals[el]}`;
        }).join('&');
    },

    params: () => {
        return this.paramsToKeyval(window.location.search.slice(1))
    },

    appendQuery: (keyval) => {
        let search  = window.location.search.slice(1);
        if (!search) return QUERY.paramsToString(keyval);
        search = QUERY.paramsToKeyval(search);
        Object.keys(keyval).forEach((el) => {
            search[el] = keyval[el];
        });
        return QUERY.paramsToString(search);
    },

    set: (keyval) => {
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + QUERY.appendQuery(keyval);
        window.history.replaceState(null, null, newUrl);
    },

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
};
