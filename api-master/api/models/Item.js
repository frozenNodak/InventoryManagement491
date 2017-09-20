/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        barcode: {
            type: 'text',
            required: true
        },

        description: {
            type: 'text'
        },

        type: {
            model: 'Itemtype',
            required: true
        },

        room: {
            model: 'Room',
            required: true
        },

        creator: {
            model: 'User',
            required: true
        },

        boughtPrice: {
            type: 'float',
            defaultsTo: 0.00
        },

        currentPrice: {
            type: 'float',
            defaultsTo: 0.00
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate(values, next) {
        var userId = values.creator;
        var roomId = values.room;
        var typeId = values.type;
        if (userId) {
            User.findOne(userId, function(err, user) {
                if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
                if (roomId) {
                    Room.findOne(roomId, function(err, room) {
                        if (err || !room) return next(sails.config.additionals.ROOM_NOT_FOUND);
                        if (typeId) {
                            Itemtype.findOne(typeId, function(err, type) {
                                if (err || !type) return next(sails.config.additionals.ITEMTYPE_NOT_FOUND);
                                return next();
                            });
                        } else {
                            return next();
                        }
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
