var connection = require('../controllers/database').connection;

exports.getNavbar = function (callback) {
	var sql = "SELECT navbar.Title, link.Path FROM navbar INNER JOIN link ON navbar.PathID = link.PathID;";
	console.log(sql);

	connection.query(sql, function (err, result) {

        if (err) {
            console.error(err);
            throw err;
        }

        console.log(result);

        if (result.length > 0) {
            callback(true, result);
        } else {
            callback(false, null);
        }

    });

}