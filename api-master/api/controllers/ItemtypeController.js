/**
 * ItemtypeController
 *
 * @description :: Server-side logic for managing itemtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	item: function(req, res, next) {
		var itemType = req.param('id');
		if (!itemType) {
			return next(sails.config.additionals.MISSING_ITEMTYPE); 
		}

		Itemtype.findOne(itemType).populate('items').exec(function(err, itemType) {
			if (err || !itemType) return next(sails.config.additionals.ITEMTYPE_NOT_FOUND);
			return res.ok(itemType);
		});
	}
};

