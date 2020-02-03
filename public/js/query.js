let QUERY = {
    paramsToKeyval: (str) => {
        return str.split(/[&;]/).map(el => {
            let keyvalArr = el.split('=');
            let result = {};
            result[keyvalArr[0]] = keyvalArr[1];
            return result;
        });
    },

    paramsToString: (keyvals) => {
        return Object.keys(keyvals).map(el => {
            return `${el}=${keyvals[el]}`;
        }).join('&');
    },

    params: () => {
        return this.paramsToKeyval(window.location.search.slice(1))
    },

    set: (keyval) => {
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + QUERY.paramsToString(keyval);
        window.history.replaceState(null, null, newUrl);
    }
};
