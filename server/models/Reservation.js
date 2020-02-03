const mongoose = require('neuronex_mongoose'),
    STATUS = require('../constants/reservationStatus'),
    crypto = require('crypto');
    Schema = mongoose.Schema;

const reservationSchema = Schema({
    hotelId: Schema.ObjectId,
    apartmentId: Schema.ObjectId,
    start: Date,
    end: Date,
    name: String,
    phone: String,
    email: String,
    wishes: String,
    price: Number,
    humans: Number,
    children: Number,
    status: String,
    token: String,
    createdAt: Date,
});

reservationSchema.path('createdAt').default(() => new Date());
reservationSchema.path('status').default(() => STATUS.ACTIVE);
reservationSchema.path('token').default(() => crypto.randomBytes(8).toString('hex'));

module.exports = mongoose.model('Reservation', reservationSchema);