var page = require('../models/page');
var navbar = require('../models/navbar');
var link = require('../models/link');

exports.index = function(req, res) {
	console.log(req.session.user.username);
	res.render('manage/index');
};

exports.pages = function(req, res) {

	page.getAllPages(function(pagesExists, pagesData) {
		res.render('manage/pages', {pages: pagesData});
	});

};

exports.links = function(req, res) {

	link.getAllLinks(function(linksExists, linksData) {
		
		page.getAllPages(function(pagesExists, pagesData) {
			res.render('manage/links', {links: linksData, pages: pagesData});
		});
		
	});

};

exports.addLink = function(req, res) {
	link.newLink(req.body.path, req.body.pageID, function(result) {
		res.redirect('manage/links');
	});
};

exports.removeLink = function(req, res) {
	link.removeLink(req.body.pathID, function(result) {
		res.redirect('manage/links');
	});
}

exports.navbar = function(req, res) {
	navbar.getNavbar(function(navbarExists, navbarData) {
		res.render('manage/navbar', {navbar: navbarData});
	});
};

exports.addNavbarItem = function(req, res) {
	navbar.addNavbarItem(req.body.title, req.body.url, function(result) {
		res.redirect('manage/navbar');
	});
};

exports.saveNavbar = function(req, res) {
	var items = req.body.order;
	console.log(items);
	for (var i = 0; i < items.length; i++) {
		navbar.saveNavbarItemPlace(items[i], i, function(result) {
			console.log(result);
		});
	}

	res.send("Items saved");

};

exports.saveNavbarItem = function(req, res) {

}

exports.users = function(req, res) {
	page.getAllPages(function(usersExists, usersData) {
		res.render('manage/users', {users: usersData});
	});
};

exports.editPage = function(req, res) {
	page.getPageByID(req.params.id, function(pageExists, pageData) {
		if (pageExists) {
			res.render('manage/editPage', {title: pageData.Title, content: pageData.Content, id: req.params.id});
		} else {
			res.render('manage/editPage', {title: "New page", content: "Content here", id: 0});
		}
	});
};

exports.savePage = function(req, res) {

	if (req.body.id > 0) {
		page.updatePage(req.body.id, req.body.title, req.body.content, function(result) {
			res.redirect('manage/pages');
		});
	} else {
		page.newPage(req.body.title, req.body.content, req.session.user.userID, function(result) {
			res.redirect('manage/pages');
		});
	}
};

exports.removePage = function(req, res) {

	page.removePage(req.body.id, function(result) {
		res.redirect('/manage/pages');
	});

}

exports.removeNavbarItem  = function(req, res) {

	navbar.removeNavbarItem(req.body.id, function(result) {
		res.redirect('/manage/navbar');
	});

}