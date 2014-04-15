var connection = require('../controllers/database').connection;

//search page with path
exports.getPageByPath = function (path, callback) {
	var sql = "SELECT * FROM Link INNER JOIN Page ON Link.PageID=Page.PageID WHERE Link.Path='" + path + "';";
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
    var sql = "SELECT * FROM Page WHERE PageID='" + id + "';";
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

exports.getAllPages = function (callback) {
    var sql = "SELECT * FROM Page INNER JOIN User ON Page.UserID=User.UserID;";

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

exports.updatePage = function(id, title, content, callback) {
    var sql = "UPDATE Page SET Title='" + title + "', Content='" + content + "', Updated=CURRENT_TIMESTAMP WHERE PageID='" + id + "';";

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

exports.newPage = function(title, content, userId, callback) {
    var sql = "INSERT INTO Page (Title, Content, UserID, Created, Updated) VALUES ('" + title + "', '" + content + "', '" + userId + "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

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

exports.removePage = function(id, callback) {

    var sql = "DELETE FROM Page WHERE PageID='" + id + "';";

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


exports.updatePageLoads = function(id, callback) {
    var sql = "UPDATE Page SET Loads=Loads+1 WHERE PageID='" + id + "';";

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