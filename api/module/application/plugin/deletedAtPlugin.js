module.exports = exports = (schema, options) => {

    schema.pre(['find', 'findOne'], function (next) {
        this.where({ deletedAt: { $exists: false } });
        next();
    });

    
}