const mongoose = require('mongoose');
const baseSchema = require('../../application/schema/baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const librarySchema = baseSchema.generateSchema(
    new Schema({
        ebookId: {
            type: Schema.Types.ObjectId,
            ref: "Ebook",
            required: [true, "Wartość jest wymagana"]
        },
        file: { type: String } //Link do pliku ebooka
    }, {
        collection: 'user_library'
    })
);

module.exports = librarySchema;