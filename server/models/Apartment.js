const mongoose = require('neuronex_mongoose'),
    Schema = mongoose.Schema;

const apartmentSchema = Schema({
    hotelId: Schema.ObjectId,
    images: [String],
    name: String,
    description: String,
    link: String,
    price: Number,
    maxHumans: Number,
    maxChildren: Number,
    createdAt: Date,
});

apartmentSchema.path('createdAt').default(() => new Date());

module.exports = mongoose.model('Apartment', apartmentSchema);