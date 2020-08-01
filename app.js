require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var methodOverride = require('method-override')


var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

app.use(methodOverride('_method'));
app.use(cookieParser('bla'));
app.use(expressSession({ secret: 'bla2' }));

mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@ds061797.mlab.com:61797/retrobook`, function (error) {

	if (error) console.error(error);
	else console.log("mongo connected")

});

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(flash());

require('./routes.js')(app);

app.listen(app.get("port"), function () {
	console.log("Server started on port " + app.get("port"));
});

