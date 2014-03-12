var connection = require('../controllers/database').connection;

exports.getLinks = function (callback) {
    var sql = "SELECT * FROM link;";

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