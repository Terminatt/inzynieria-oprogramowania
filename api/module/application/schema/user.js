const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const userSchema = baseSchema.generateSchema(
    new Schema({
        active: {
            type: Boolean,
            default: false,
            required: [true, "Wartość jest wymagana"]
        },
        name: {
            type: String,
            minlength: 1,
            required: [true, "Wartość jest wymagana"],
            minlength: [1, "Nieprawidłowa nazwa użytkownika"]
        },
        sex: {
            type: String,
            minlength: 1,
            required: [true, "Wartość jest wymagana"],
            enum: {
                values: ["male", "female"],
                message: "Nieprawidłowa wartość"
            }
        },
        email: {
            type: String,
            required: [true, "Wartość jest wymagana"],
            minlength: [1, "Nieprawidłowy adres email"]
        },
        password: {
            type: String,
            required: [true, "Wartość jest wymagana"],
            minlength: [1, "Nieprawidłowa wartość"]
        }
    }, {
        collection: 'user_user'
    })
);

userSchema.index({ "email": 1 });

module.exports = userSchema;