let AJAX = {
    get: (url, query) => {
        if (!query) query = {};

        return new Promise(((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url + '?' + QUERY.paramsToString(query), true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return reject({code: this.status, body: this.statusText});
                return resolve(JSON.parse(this.response));
            };
            xhr.send();
        }));
    },

    post: (url, body, query) => {
        if (!body) body = {};
        if (!query) query = {};

        return new Promise(((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url + '?' + QUERY.paramsToString(query), true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return reject({code: this.status, body: this.statusText});
                return resolve(JSON.parse(this.response));
            };
            xhr.send(JSON.stringify(body));
        }));
    }
};
