const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(genres) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(genres, schema);
}

exports.Genre = Genre;
exports.validateGenres = validateGenres;
exports.genreSchema = genreSchema;