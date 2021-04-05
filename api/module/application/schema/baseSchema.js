const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.generateSchema = (schema) => {
    const baseSchema = new Schema({
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        creator: { type: Schema.Types.ObjectId, ref: "User" }
    }, {
        versionKey: false
    });
    return new Schema(
        Object.assign({}, baseSchema.obj, schema.obj),
        Object.assign({}, schema.options, baseSchema.options)
    );
} 