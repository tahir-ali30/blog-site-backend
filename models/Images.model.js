const mongoose = require('mongoose')
const { Schema, model } = mongoose

const imagesSchema = new Schema({
    url: String,
    public_id: String,
})

module.exports = model('Image', imagesSchema);