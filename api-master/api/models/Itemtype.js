/**
 * Itemtype.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        name: {
            type: 'text',
            required: true
        },

        description: {
            type: 'text'
        },

        creator: {
            model: 'User',
            required: true
        },

        items: {
            collection: 'Item',
            via: 'type'
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate(values, next) {
        var userId = values.creator;
        if (userId) {
            User.findOne(userId, function(err, user) {
                if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
                return next();
            });
        } else {
            return next();
        }
    },
};
