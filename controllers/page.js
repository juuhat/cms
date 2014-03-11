var page = require('../models/page');
var navbar = require('../models/navbar');

exports.show = function(req, res) {

	page.getPageByPath(req.params.path, function(pageExists, pageData) {

			navbar.getNavbar(function(navExists, navData) {
				if (pageExists) {
					res.render('page', {title: pageData.Title, text: pageData.Content, navItems: navData});
				} else {
					res.render('page', {title: "404", text: "Page not found", navItems: navData});
				}
			});

	});

}