var connection = require('../controllers/database').connection;

//search page with path/link
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

exports.getPageByID = function (id, callback) {
    var sql = "SELECT * FROM page WHERE PageID='" + id + "';";

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

exports.getAllPages = function (callback) {
    var sql = "SELECT * FROM page;";

    connection.query(sql, function (err, result) {

        if (err) {
            console.error(err);
            throw err;
        }

        //check if pages exist
        if (result.length > 0) {
            callback(true, result);
        } else {
            callback(false, null);
        }

    });

}