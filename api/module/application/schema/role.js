const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const roleSchema = baseSchema.generateSchema(
    new Schema({
        name: {
            type: String,
            default: false,
            required: [true, "Wartość jest wymagana"]
        },
        superAdmin: {
          type: Boolean,
          default: false,
          required: false,
        },
        deletable: {
          type: Boolean,
          default: false,
          required: false,
      },
        
    }, {
        collection: 'user_role'
    })
);

roleSchema.index({ "name": 1 });

module.exports = roleSchema;