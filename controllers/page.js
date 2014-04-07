var page = require('../models/page');
var navbar = require('../models/navbar');

exports.show = function(req, res) {
	console.log("path: " + req.params);
	page.getPageByPath(req.params, function(pageExists, pageData) {

			navbar.getNavbar(function(navExists, navData) {
				if (pageExists) {
					page.updatePageLoads(pageData.PageID, function(result) {});
					res.render('page', {title: pageData.Title, text: pageData.Content, navItems: navData});
				} else {
					res.render('page', {title: "404", text: "Page not found", navItems: navData});
				}
			});



	});

}