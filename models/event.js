const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String},
  description: { type: String, required: true },
  participantsLimit: Number,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  organizer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: { type: String, required: true },
  stars: { type: Number, required: true }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;