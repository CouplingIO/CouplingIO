// Module dependencies
var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

//Launch express
var app = express();

var port = 3010;

// Config Envarioment
app.set('port', port || process.env.PORT);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
var routes = require('./routes/routes');

//Set Up JSON parser and view engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Express app requirements and response
app.use(function(req,res,next){
    next();
});

app.get('/', routes.index);
app.get('/partials/:name',routes.partials);
app.get('/home', routes.index);
app.get('/login', routes.index);
app.get('/register', routes.index);
app.get('/issueCoupon', routes.index);
app.get('/404', routes.index);

app.post('/login', routes.login);
app.post('/register', routes.register);
app.post('/issueCoupon', routes.issueCoupon);

//IF NOT GO TO ERROR404
app.all('*',function(req,res) { res.redirect('/404') });

module.exports = app;

//Start the server
app.listen(app.get('port'), function() {
    console.log('CouplingIO app started on '+Date(Date.now())+' at port: '+app.get('port'));
})
