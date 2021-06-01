const mongoose = require('mongoose');
const baseSchema = require('../../application/schema/baseSchema');
const Schema = mongoose.Schema;
const _ = require("lodash");

//generate schema with base schema
const reviewSchema = baseSchema.generateSchema(
    new Schema({
        ebookId: {
            type: Schema.Types.ObjectId,
            ref: "Ebook",
            required: [true, "Wartość jest wymagana"]
        },
        stars: {
            type: Number,
            min: [1, "Ocena nie może być mniejsza niż 1"],
            max: [5, "Ocena nie może być większa niż 5"],
            required: [true, "Ocena jest wymagana"]
        },
        comment: {
            type: String,
            required: [true, "Komentarz jest wymagany"]
        }
    }, {
        collection: 'ebook_review'
    })
);

module.exports = reviewSchema;