/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    item: function(req, res, next) {
        var roomId = req.param('id');
        if (!roomId) {
            return next(sails.config.additionals.MISSING_ROOM);
        }

        Room.findOne(roomId).populate('items', {sort: 'type ASC'}).exec(function(err, room) {
            if (err || !room) return next(sails.config.additionals.ROOM_NOT_FOUND);
            return res.ok(room);
        });
    },

    items: function(req, res, next) {
        Room.find().populate('items').exec(function(err, rooms) {
            if (err || !rooms || rooms.length == 0) return next(sails.config.additionals.ROOM_NOT_FOUND);
            return res.ok(rooms);
        });
    },

    itemTypes: function(req, res, next) {
        var roomId = req.param('id');
        var typeId = req.param('tid');
        if (!roomId) {
            return next(sails.config.additionals.MISSING_ROOM);
        }

        Room.findOne({ where: { id: roomId } }).populate('items', { where: { type: typeId } }).exec(function(err, room) {
            if (err || !room) return next(sails.config.additionals.ROOM_NOT_FOUND);
            return res.ok(room);
        });
    },

    building: function(req, res, next) {
        var buildingId = req.param('id');
        if (!buildingId) {
            return next(sails.config.additionals.MISSING_BUILDING);
        }
        Building.findOne(buildingId).populate('rooms').exec(function(err, building) {
            if (err || !building) return next(sails.config.additionals.BUILDING_NOT_FOUND);
            return res.ok(building);
        });
    }
};
