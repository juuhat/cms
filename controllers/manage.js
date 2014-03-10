exports.login = function(req, res) {
	res.render('login');
};

exports.index = function(req, res) {
	res.render('manage/index');
};

exports.pages = function(req, res) {
	res.render('manage/pages');
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