const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const text = mongoose.model('text', {
    name: String,
    value: String,
    owner: String
});

module.exports = text;