var mysql = require('mysql');

var connection = exports.connection = mysql.createConnection({
	host : 'localhost',
	//port : 3003,
	user : 'root',
	//password : '',
	database : 'cms'
});
connection.connect();