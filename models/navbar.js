var connection = require('../controllers/database').connection;

exports.getNavbar = function (callback) {
	var sql = "SELECT navbar.Title, link.Path, navbar.Place, navbar.NavbarID FROM navbar INNER JOIN link ON navbar.PathID = link.PathID ORDER BY navbar.Place;";
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

exports.addNavbarItem = function(title, pathID, callback) {
    var sql = "INSERT INTO navbar (Place, Title, PathID) SELECT MAX(Place) + 1, '" + title + "', '" + pathID + "' FROM navbar;";

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

exports.saveNavbarItem = function(navbarID, place, callback) {
    var sql = "UPDATE navbar SET Place='" + place + "' WHERE NavbarID='" + navbarID + "';";

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

