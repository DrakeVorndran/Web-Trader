const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const background = mongoose.model('background', {
    name: String,
    value: String
});

module.exports = background;