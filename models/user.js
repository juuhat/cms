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
	var sql = "SELECT * FROM User WHERE Username=" + connection.escape(username) + " LIMIT 1;";
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

	var sql = "INSERT INTO User (username, password) VALUES (" + connection.escape(username) + ", " + connection.escape(hash) + ");";
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

	var sql = "SELECT * FROM User WHERE Username=" + connection.escape(username) + ";";
	console.log(sql);

	connection.query(sql, function (err, result) {

		if (err) {
			console.error(err);
            throw err;
        }           

        if (result.length > 0) {

        	var row = result[0];

            if (bcrypt.compareSync(password, row.Password)) {

            	//create user to be saved in session
                var user = {
                    userID : row.UserID,
                    username : row.Username,
                    email : "test@example.com"
                };

            	callback(user);
            } else {
                callback(null);
            }

        } else {
            callback(null);
        }
    });

}

exports.getAllUsers = function (callback) {
    var sql = "SELECT * FROM User;";

    connection.query(sql, function (err, result) {

        if (err) {
            console.error(err);
            throw err;
        }

        //check if users exist
        if (result.length > 0) {
            callback(true, result);
        } else {
            callback(false, null);
        }

    });

}