//=============
//DEPENDENCIES
//=============
const mongoose = require('mongoose');

//////////Event Schema///////////
const eventSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  zip: String,
  price: Number,
  description: String,
  idForUser: String,
});

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
