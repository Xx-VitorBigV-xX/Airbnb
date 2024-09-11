const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},// owner referencia da coleçaõ user
    title: String,
    address: String,
    photos: [Strings],
    description: String,
    perks: [String],
    extraInfo: String,
    checkout:Number,
    maxGuests:Number,
})
const PlaceModel = mongoose.model('Place',placeSchema);
model.exports = PlaceModel;