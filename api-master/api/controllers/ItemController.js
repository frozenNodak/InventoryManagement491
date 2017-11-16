/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findOne: function(req, res, next) {
        var item = req.param('item');

        var query = 'SELECT item.barcode,' +
            ' item.id,' +
            ' item.creator,' +
            ' CONCAT(user.firstName, \' \', user.lastName) as creatorName,' +
            ' item.boughtPrice,' +
            ' item.currentPrice,' +
            ' item.description,' +
            ' itemtype.name as itemType,' +
            ' item.type as itemTypeId,' +
            ' room.id as roomId,' +
            ' room.number as roomNumber,' +
            ' building.id as buildingId,' +
            ' building.name as buildingName,' +
            ' department.id as departmentId,' +
            ' department.name as departmentName' +
            ' FROM item' +
            ' JOIN user on user.id = item.creator' +
            ' JOIN itemtype on itemtype.id = item.type' +
            ' JOIN room on room.id = item.room' +
            ' JOIN building on building.id = room.building' +
            ' JOIN department on department.id = building.department' +
            ' WHERE item.id = ' + item;

        Item.query(query, function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEMS_SEARCH_NOT_FOUND);
            return res.ok(items);
        });
    },

    find: function(req, res, next) {

        var query = 'SELECT item.barcode,' +
            ' item.id,' +
            ' item.creator,' +
            ' CONCAT(user.firstName, \' \', user.lastName) as creatorName,' +
            ' item.boughtPrice,' +
            ' item.currentPrice,' +
            ' item.description,' +
            ' itemtype.name as itemType,' +
            ' item.type as itemTypeId' +
            ' FROM item' +
            ' JOIN user on user.id = item.creator' +
            ' JOIN itemtype on itemtype.id = item.type';

        Item.query(query, function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEMS_SEARCH_NOT_FOUND);
            return res.ok(items);
        });
    },

    search: function(req, res, next) {
        var departmentId = req.param('did');
        var buildingId = req.param('bid');
        var roomId = req.param('rid');

        if (!req.user.departments) return next(sails.config.additionals.MISSING_PREMISSION_DEPARTMENTS);
        if (departmentId && req.user.departments.indexOf(parseInt(departmentId)) == -1) return next(sails.config.additionals.MISSING_PREMISSION_DEPARTMENT);
        if (buildingId && req.user.buildings.indexOf(parseInt(buildingId)) == -1) return next(sails.config.additionals.MISSING_PREMISSION_BUILDING);

        var query = 'SELECT item.*, itemtype.name AS typeName, itemtype.description AS typeDescription ' +
            'FROM item ' +
            'INNER JOIN ' +
            '(room INNER JOIN ' +
            '(building INNER JOIN department ON department.id = building.department) ' +
            'ON building.id = room.building) ' +
            'ON item.room = room.id ' +
            'INNER JOIN itemtype ON itemtype.id = item.type ';

        if (!departmentId) {
            query = query + ' WHERE (department.id IN (' + req.user.departments + '))';
        }

        if (departmentId) {
            query = query + ' WHERE (department.id = ' + departmentId;
            if (buildingId) query = query + ' AND building.id = ' + buildingId;
            else query = query + ' AND building.id IN (' + req.user.buildings + ')';
            if (roomId) query = query + ' AND room.id = ' + roomId;
            query = query + ')';
        }

        Item.query(query, function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEMS_SEARCH_NOT_FOUND);
            return res.ok(items);
        });
    },

    barcode: function(req, res, next) {
        var barcode = req.param('barcode');

        var query = 'SELECT item.barcode,' +
            ' item.id,' +
            ' item.creator,' +
            ' CONCAT(user.firstName, \' \', user.lastName) as creatorName,' +
            ' item.boughtPrice,' +
            ' item.currentPrice,' +
            ' item.description,' +
            ' itemtype.name as itemType,' +
            ' item.type as itemTypeId,' +
            ' room.id as roomId,' +
            ' room.number as roomNumber,' +
            ' building.id as buildingId,' +
            ' building.name as buildingName,' +
            ' department.id as departmentId,' +
            ' department.name as departmentName' +
            ' FROM item' +
            ' JOIN user on user.id = item.creator' +
            ' JOIN itemtype on itemtype.id = item.type' +
            ' JOIN room on room.id = item.room' +
            ' JOIN building on building.id = room.building' +
            ' JOIN department on department.id = building.department' +
            ' WHERE item.barcode = ?';

        Item.query(query, [barcode], function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEMS_SEARCH_NOT_FOUND);
            return res.ok(items);
        });
    }
};
