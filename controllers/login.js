var user = require('../models/user');

exports.showLogin = function(req, res) {
	var info = req.query.info;

	var infoText = "";

	if (info == 1)
		infoText = "Wrong username or password";
	if (info == 2)
		infoText = "You have successfully logged out"

	res.render('login', {info: infoText});
};

exports.postLogin = function(req, res) {
	//console.log(req.body);

	user.authAttempt(req.body.username, req.body.password, function(user) {
		
		if (user != null) {
			req.session.user = user;
			console.log(req.session.user);
			res.redirect('/manage');
		} else {
			res.redirect('/login?info=1');
		}
		
	});
	
}

exports.showLogout = function(req, res) {
	req.session.user = null;
	res.redirect('/login?info=2');
}