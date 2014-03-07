var crypto = require('crypto');
var connection = require('../controllers/database').connection;

var hash = function (pass, salt) {
	var h = crypto.createHash('sha512');
	h.update(pass);
	h.update(salt);
	return h.digest('base64');
};

exports.getUser = function (username, password, callback) {
	var sql = "SELECT * FROM user WHERE username='" + username + "' LIMIT 1";
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
        
		var salt = crypto.randomBytes(128).toString('base64');
        var newHash = hash(password, salt);

        var sql = "INSERT INTO user (username, password, salt) VALUES ('" + username + "', '" + newHash + "', '" + salt + "');";
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