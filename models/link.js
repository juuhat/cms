var connection = require('../controllers/database').connection;

exports.getAllLinks = function (callback) {
    var sql = "SELECT * FROM Link INNER JOIN Page ON Link.PageID = Page.PageID;";

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

exports.newLink = function(path, pageID, callback) {

    var sql = "INSERT INTO Link (Path, PageID) VALUES ('" + path + "', '" + pageID + "');";

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

exports.removeLink = function(pathID, callback) {

    var sql = "DELETE FROM Link WHERE Link.PathID = " + pathID + ";";

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