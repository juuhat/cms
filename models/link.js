var connection = require('../controllers/database').connection;

exports.getAllLinks = function (callback) {
    var sql = "SELECT * FROM link INNER JOIN page ON link.PageID = page.PageID;";

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

    var sql = "INSERT INTO link (Path, PageID) VALUES ('" + path + "', '" + pageID + "');";

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