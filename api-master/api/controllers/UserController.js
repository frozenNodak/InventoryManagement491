"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */

module.exports = {
    addPermission: function(req, res, next) {
        if (!req.body.permission) return next(sails.config.additionals.MISSING_PERMISSION);

        Permission.findOne({ id: req.body.permission }).exec(function(err, permission) {
            if (err || !permission) return next(sails.config.additionals.MISSING_PERMISSION);

            req.user.permissions = req.user.permissions ? req.user.permissions : [];
            if (req.user.permissions.indexOf(req.body.permission) != -1) return next(sails.config.additionals.ALREADY_HAS_PERMISSION);
            req.user.permissions.push(req.body.permission);
            req.user.save(function(err) {
                if (err) return res.json(err);
                return res.json(req.user);
            });
        });
    },

    removePermission: function(req, res, next) {
        if (!req.body.permission) return next(sails.config.additionals.MISSING_PERMISSION);

         Permission.findOne({ id: req.body.permission }).exec(function(err, permission) {
            if (err || !permission) return next(sails.config.additionals.MISSING_PERMISSION);

            req.user.permissions = req.user.permissions ? req.user.permissions : [];
            var index = req.user.permissions.indexOf(req.body.permission);
            if (index == -1) return next(sails.config.additionals.MISSING_PERMISSION);
            req.user.permissions.splice(index, 1);
            req.user.save(function(err) {
                return res.json(req.user);
            });
        });
    }
};
