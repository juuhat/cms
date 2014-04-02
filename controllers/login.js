var user = require('../models/user');

exports.showLogin = function(req, res) {
	res.render('login');
};

exports.postLogin = function(req, res) {
	//console.log(req.body);

	user.authAttempt(req.body.username, req.body.password, function(user) {
		
		if (user != null) {
			req.session.user = user;
			console.log(req.session.user);
			res.redirect('/manage');
		} else {
			res.redirect('/login');
		}
		
	});
	
}