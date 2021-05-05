const mongoose = require('mongoose');
const baseSchema = require('../../application/schema/baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const categorySchema = baseSchema.generateSchema(
    new Schema({
        name: {
            type: String,
            required: [true, "Nazwa kategorii jest wymagana"]
        },
        description: {
            type: String
        }
    }, {
        collection: 'ebook_category'
    })
);

module.exports = categorySchema;