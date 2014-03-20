var connection = require('../controllers/database').connection;

exports.getNavbar = function (callback) {
	var sql = "SELECT navbar.Title, link.Path, navbar.Place FROM navbar INNER JOIN link ON navbar.PathID = link.PathID;";
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

exports.addNavbarItem = function(title, place, pathID, callback) {
    var sql = "INSERT INTO navbar (Title, Place, pathID) VALUES ('" + title + "', '" + place + "', '" + pathID + "');";

    console.log(sql);

    connection.query(sql, function (err, result) {
        if (err) {
            console.error(err);
            callback(null);
        } else {
            callback(null);
        }
    });

}