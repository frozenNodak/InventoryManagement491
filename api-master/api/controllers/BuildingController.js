/**
 * BuildingController
 *
 * @description :: Server-side logic for managing buildings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	room: function(req, res, next) {
		var buildingId = req.param('id');
		if (!buildingId) {
			return next(sails.config.additionals.MISSING_BUILDING); 
		}
		Building.findOne(buildingId).populate('rooms').exec(function(err, building) {
			if (err || !building) return next(sails.config.additionals.BUILDING_NOT_FOUND);
			return res.ok(building);
		});
	},

	rooms: function(req, res, next) {
		Building.find().populate('rooms').exec(function(err, buildings) {
			if (err || !buildings || buildings.length == 0) return next(sails.config.additionals.BUILDING_NOT_FOUND);
			return res.ok(buildings);
		});
	},

	department: function(req, res, next) {
		var departmentId = req.param('id');
		if (!departmentId) {
			return next(sails.config.additionals.MISSING_DEPARTMENT); 
		}
		Department.findOne(departmentId).populate('buildings').exec(function(err, departments) {
			if (err || !departments) return next(sails.config.additionals.DEPARTMENT_NOT_FOUND);
			return res.ok(departments);
		});
	}
};

