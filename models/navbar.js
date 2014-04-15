var connection = require('../controllers/database').connection;

exports.getNavbar = function (callback) {
	var sql = "SELECT Navbar.Title, Navbar.Url, Navbar.Place, Navbar.NavbarID FROM Navbar ORDER BY Navbar.Place;";
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

exports.addNavbarItem = function(title, url, callback) {
    var sql = "INSERT INTO Navbar (Place, Title, Url) SELECT MAX(Place) + 1, '" + title + "', '" + url + "' FROM Navbar;";

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

exports.saveNavbarItemPlace = function(navbarID, place, callback) {
    //var sql = "UPDATE navbar SET Place='" + place + ", Title='" + title + "' WHERE NavbarID='" + navbarID + "';";
    var sql = "UPDATE Navbar SET Place='" + place + "' WHERE NavbarID='" + navbarID + "';";

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

exports.saveNavbarItemContent = function(navbarID, title, url, callback) {
    var sql = "UPDATE Navbar SET Title='" + title + "', Url='" + url + "' WHERE NavbarID='" + navbarID + "';";

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

exports.removeNavbarItem = function(navbarID, callback) {
    var sql = "DELETE FROM Navbar WHERE NavbarID=" + navbarID + ";";

    connection.query(sql, function (err, result) {
        if (err) {
            console.error(err);
            callback(null);
        } else {
            callback(null);
        }
    });

}
