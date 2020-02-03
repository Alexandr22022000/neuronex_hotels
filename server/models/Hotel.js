const mongoose = require('neuronex_mongoose'),
    Schema = mongoose.Schema;

const hotelSchema = Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    link: String,
    site: String,
    logo: String,
    createdAt: Date,
});

hotelSchema.path('createdAt').default(() => new Date());

module.exports = mongoose.model('Hotel', hotelSchema);