var connection = require('../controllers/database').connection;

exports.getPageByPath = function (path, callback) {
	var sql = "SELECT * FROM link INNER JOIN page ON link.PageID=page.PageID WHERE link.Path='" + path + "';";
	console.log(sql);

	connection.query(sql, function (err, result) {

		if (err) {
			console.error(err);
            throw err;
        }

        //check if page exists
        if (result.length > 0) {
            callback(true, result[0]);
        } else {
            callback(false, null);
        }

    });

}