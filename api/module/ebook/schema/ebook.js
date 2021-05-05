const mongoose = require('mongoose');
const baseSchema = require('../../application/schema/baseSchema');
const Schema = mongoose.Schema;
const _ = require("lodash");

//generate schema with base schema
const ebookSchema = baseSchema.generateSchema(
    new Schema({
        title: { type: String, required: [true, 'Wartość jest wymagana'] },
        author: { type: String, required: [true, 'Wartość jest wymagana'] },
        categories: {
            type: [{
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: "Category",
                    required: [true, 'Wartość jest wymagana']
                },
                name: {
                    type: String,
                    required: [true, 'Wartość jest wymagana']
                }
            }],
            validate: {
                validator: (val) => !_.isEmpty(val),
                message: "Nie przypisano żadnej kategorii"
            }
        },
        publisher: { type: String },
        releaseDate: { type: String },
        numberOfPages: { type: Number, min: [1, "Ebook nie może mieć mniej stron niż 1"] },
        coverImage: { type: String }, //Link do zdjęcia okładki
        file: { type: String } //Link do pliku ebooka
    }, {
        collection: 'ebook_ebook'
    })
);

module.exports = ebookSchema;