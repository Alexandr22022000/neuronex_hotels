let AJAX = {
    get: (url, query) => {
        return new Promise(((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return reject({code: this.status, body: this.statusText});
                return resolve(this.statusText);
            };
            xhr.open('GET', url + '?' + QUERY.paramsToString(query), true);
            xhr.send();
        }));
    },

    post: (url, body, query) => {
        return new Promise(((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return reject({code: this.status, body: this.statusText});
                return resolve(this.statusText);
            };
            xhr.open('POST', url + '?' + QUERY.paramsToString(query), true);
            xhr.send(body);
        }));
    }
};
