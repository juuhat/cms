//module dependencies
var express = require('express');
var http = require('http');
var path = require('path');

//init express
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '/public')));
app.locals.pretty = true; //show linebreaks in html source

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(app.router);

//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//controllers
var page = require('./controllers/page');
var manage = require('./controllers/manage');

//routes and assigned controllers
app.get('/manage', manage.index);
app.get('/manage/pages', manage.pages);
app.get('/manage/pages/:id', manage.editPage);
app.get('/manage/links', manage.links);
app.get('/manage/navbar', manage.navbar);
app.get('/manage/users', manage.users);

app.post('/manage/savePage', manage.savePage);
app.post('/manage/addLink', manage.addLink);
app.post('/manage/addNavbarItem', manage.addNavbarItem);
app.post('/manage/saveNavbar', manage.saveNavbar);

app.get('/login', manage.showLogin);
app.post('/login', manage.postLogin);

app.get('/:path', page.show);

//create test user
/*var user = require('./models/user');
user.addUser('test', 'test', function(){
});*/

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
