var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var connection = require('../controllers/database').connection;

var hash = function (pass, salt) {
	var h = crypto.createHash('sha512');
	h.update(pass);
	h.update(salt);
	return h.digest('base64');
};

exports.getUser = function (username, password, callback) {
	var sql = "SELECT * FROM user WHERE username='" + username + "' LIMIT 1;";
	console.log(sql);

	connection.query(sql, function (err, result) {

		if (err) {
			console.error(err);
            throw err;
        }
            
        if (result.rows.length === 0) {
            callback(null);
        } else {
        	var row = result.rows[0];
        	var newHash = hash(password, row.salt);

            if (row.password === newHash) {
            	callback({username: username});
            } else {
                callback(null);
            }
        }
    });

}

exports.addUser = function (username, password, callback) {

    var hash = bcrypt.hashSync(password);

	var sql = "INSERT INTO user (username, password) VALUES ('" + username + "', '" + hash+ "');";
	console.log(sql);

	connection.query(sql, function (err, result) {

		if (err) {
			console.error(err);
			callback(null);
		} else {
			callback({username: username});
		}
	});

};

exports.authAttempt = function (username, password, callback) {

	var sql = "SELECT * FROM user WHERE username='" + username + "';";
	console.log(sql);

	connection.query(sql, function (err, result) {

		if (err) {
			console.error(err);
            throw err;
        }           

        if (result.length > 0) {

        	var row = result[0];

            if (bcrypt.compareSync(password, row.Password)) {

            	//create user
                var user = {};
                user.username = row.Username;
                user.email   = "test@example.com";

            	callback({user: user});
            } else {
                callback(null);
            }

        } else {
            callback(null);
        }
    });

}