"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
    schema: true,

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            alphanumericdashed: true
        },

        password: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        firstName: {
            type: 'string',
            required: true
        },

        lastName: {
            type: 'string',
            required: true
        },
        permissions: {
            type: 'array',
            defaultsTo: []
        },

        toJSON() {
            let obj = this.toObject();

            delete obj.password;

            return obj;
        }
    },

    beforeUpdate(values, next) {
        if (false === values.hasOwnProperty('password')) return next();
        if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

        return HashService.bcrypt.hash(values.password)
            .then(hash => {
                values.password = hash;
                next();
            })
            .catch(next);
    },

    beforeCreate(values, next) {
        if (false === values.hasOwnProperty('password')) return next();

        return HashService.bcrypt.hash(values.password)
            .then(hash => {
                values.password = hash;
                next();
            })
            .catch(next);
    }
};
