var page = require('../models/page');
var navbar = require('../models/navbar');

exports.login = function(req, res) {
	res.render('login');
};

exports.index = function(req, res) {
	res.render('manage/index');
};

exports.pages = function(req, res) {

	page.getAllPages(function(pagesExists, pagesData) {
		res.render('manage/pages', {pages: pagesData});
	});

};

exports.links = function(req, res) {
	res.render('manage/links');
};

exports.navbar = function(req, res) {
	res.render('manage/navbar');
};

exports.users = function(req, res) {
	res.render('manage/users');
};

exports.editPage = function(req, res) {
	page.getPageByID(req.params.id, function(pageExists, pageData) {
		if (pageExists) {
			res.render('manage/editPage', {title: pageData.Title, content: pageData.Content, id: req.params.id});
		} else {
			res.render('manage/editPage', {title: "404", content: "Page not found", id: 0});
		}
	});
};

exports.savePage = function(req, res) {

	if (req.body.id > 0) {
		page.updatePage(req.body.id, req.body.title, req.body.content, function(result) {
			res.redirect('manage/pages');
		});
	} else {
		page.newPage(req.body.title, req.body.content, 1, "test", function(result) {
			res.redirect('manage/pages');
		});
	}
};