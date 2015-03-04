// Module dependencies
var express = require('express');
var session = require('express-session');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
//Mail
//var mailer = require('express-mailer');
// Mongo
var mongo = require('mongodb');
var mongoose = require('mongoose');
var UserDB = require('./schemas/user');
//Auth
var basicAuth = require('basic-auth-connect')
//Passport
var passport = require('passport')
var flash = require('connect-flash');

//Launch express
var app = express();

//Get Arguments
var args = process.argv.slice(2);
var port = process.env.PORT;

//Set Envarioment
if (args[0] == 'dev'){
    var port = 3010;
} else if (args[0] == 'prod'){
    //Use HTTP Auth on PROD
    app.use(basicAuth('coupling', '666'));
}

//Connect DB
mongoose.connect('mongodb://admin:admin@ds053190.mongolab.com:53190/couplingio');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to MONGOLAB DB !');
});

//Mailer app config
/*
mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'contact@user.com',
    pass: 'pass'
  }
});
*/
// Config Envarioment
app.set('port', port || process.env.PORT);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 
//Schemas
require('./schemas/user')(db);

//Passport
require('./routes/passport')(passport,db);

//Routes
var routes = require('./routes/routes');

//Set Up JSON parser and view engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express app requirements and response
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', routes.index);
app.get('/partials/:name',routes.partials);
app.get('/home', routes.index);
app.get('/login', routes.index);
app.get('/register', routes.index);
app.get('/issueCoupon', routes.index);
app.get('/404', routes.index);

app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/register',
        failureRedirect : '/'
}));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/register',
        failureRedirect : '/'
}));

app.post('/login', routes.login);
app.post('/register', routes.register);
app.post('/issueCoupon', routes.issueCoupon);
app.post('/createWallet', routes.createWallet);

//IF NOT GO TO ERROR404
//app.all('*',function(req,res) { res.redirect('/404') });

module.exports = app;

//Start the server
app.listen(app.get('port'), function() {
    console.log('CouplingIO app started on '+Date(Date.now())+' at port: '+app.get('port'));
})



