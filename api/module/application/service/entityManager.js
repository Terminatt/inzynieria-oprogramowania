const mongoose = require('mongoose');
const config = require('../../../config/config');
const _ = require("lodash");

class EntityManager {

    init() {
        const { classmap } = config;
        let registered = mongoose.modelNames();

        _.each(classmap, (path, name) => {
            if (!_.includes(registered, name)) {
                mongoose.model(name, require(global.appRoot + "/module/" + path));
            }
        });
    }

    initModel(name) {
        const { classmap } = config;
        let registered = mongoose.modelNames();
        if (!_.includes(registered, name) && _.has(classmap, name)) {
            mongoose.model(name, require(global.appRoot + "/module/" + classmap[name]));
        }
    }

    isRegistered(name) {
        return _.includes(mongoose.modelNames(), name);
    }

    checkInit() {
        const { classmap } = config;
        if(mongoose.modelNames().length < Object.keys(classmap).length) {
            this.init();
        }
    }

}

module.exports = new EntityManager();