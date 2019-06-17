const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    email: String,
    Phone: Number,
    zip: Number
})

const User = mongoose.model('User', userSchema);

module.exports = User;
