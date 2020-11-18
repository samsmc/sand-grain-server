const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    participants: [{type: Schema.Types.ObjectId,ref:'User'}],
    organizer: [{type: Schema.Types.ObjectId,ref:'User'}],
    description: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: Date, required: true},
    category: {type: String, required: true},
    stars: {type: Number, required: true}
});

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;