const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const Schema = mongoose.Schema;

//generate schema with base schema
const aclSchema = baseSchema.generateSchema(
    new Schema({
        permissions: {
          type: [String],
          default: false,
          required: [true, "Wartość jest wymagana"]
        },
        entityName: {
          type: String,
          default: false,
          required: [true, "Wartość jest wymagana"],
        },
        role: { type: Schema.Types.ObjectId, ref: "Role" }
    }, {
        collection: 'user_acl'
    })
);


module.exports = aclSchema;