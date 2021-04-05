const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const tokenSchema = baseSchema.generateSchema(
    new Schema({
        token: String,
        action: {
            type: String,
            enum: ["register"]
        },
        user: { type: Schema.Types.ObjectId, ref: "User" }
    }, {
        collection: 'application_token'
    })
);

tokenSchema.index({ "token": 1 });

module.exports = tokenSchema;