const Mailer = require('neuronex_mailer');

const mailer = new Mailer({
    email: process.env.MAILER_EMAIL || 'info@neuronex.pro',
    secret: process.env.MAILER_SECRET || 'testSecret',
    host: process.env.MAILER_HOST,
});

module.exports = msg => {
    return mailer.sendMsg(msg);
};