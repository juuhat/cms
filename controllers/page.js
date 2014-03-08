var page = require('../models/page');

exports.show = function(req, res) {

	page.getPageByPath(req.params.id, function(exists, data) {

		if (exists) {
			res.render('page', {title: data.Title, text: data.Content});
		} else {
			res.render('page', {title: "404", text: "Page not found"});
		}

	});

}