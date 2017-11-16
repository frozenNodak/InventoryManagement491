"use strict";

module.exports = function getDepartmentsAndBuildings(req, res, next) {
    if (req.user.permissions == null) return next();

    var query = 'SELECT permission.department, permission.building ' +
        'FROM permission WHERE permission.id IN (' + req.user.permissions + ')';

    Permission.query(query, function(err, permissions) {
        req.user.departments = [];
        req.user.buildings = [];

        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].department != null) req.user.departments.push(permissions[i].department);
            if (permissions[i].building != null) req.user.buildings.push(permissions[i].building);
        }

        return next();
    });
};
