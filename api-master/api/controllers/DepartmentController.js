/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	building: function(req, res, next) {
		var departmentId = req.param('id');
		if (!departmentId) {
			return next(sails.config.additionals.MISSING_DEPARTMENT); 
		}

		Department.findOne(departmentId).populate('buildings').exec(function(err, department) {
			if (err || !department) return next(sails.config.additionals.DEPARTMENT_NOT_FOUND);
			return res.ok(department);
		});
	},

	buildings: function(req, res, next) {
		Department.find().populate('buildings').exec(function(err, departments) {
			if (err || !departments || departments.length == 0) return next(sails.config.additionals.DEPARTMENT_NOT_FOUND);
			return res.ok(departments);
		});
	}
};

