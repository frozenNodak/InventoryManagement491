/**
 * Room.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        number: {
            type: 'text',
            required: true
        },

        creator: {
            model: 'User',
            required: true
        },

        building: {
            model: 'Building'
        },

        items: {
            collection: 'Item',
            via: 'room'
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate(values, next) {
        var userId = values.creator;
        var buildingId = values.building;
        if (userId) {
            User.findOne(userId, function(err, user) {
                if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
                if (buildingId) {
                    Building.findOne(buildingId, function(err, building) {
                        if (err || !building) return next(sails.config.additionals.BUILDING_NOT_FOUND);
                        return next();
                    });
                } else {
                    return next();
                }
            });
        } else {
            return next();
        }
    },
};
