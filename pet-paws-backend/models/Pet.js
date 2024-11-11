const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
    name: {type: String, required: true},
    species: {type: String, required: true},
    age: {type: Number},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Pet', petSchema)