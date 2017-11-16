/**
 * Building.js
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

        creator: {
            model: 'User',
            required: true
        },

        department: {
            model: 'Department',
            required: true
        },

        rooms: {
            collection: 'Room',
            via: 'building'
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate(values, next) {
        var userId = values.creator;
        var departmentId = values.department;
        if (userId) {
            User.findOne(userId, function(err, user) {
                if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
                if (departmentId) {
                    Department.findOne(departmentId, function(err, department) {
                        if (err || !department) return next(sails.config.additionals.DEPARTMENT_NOT_FOUND);
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
