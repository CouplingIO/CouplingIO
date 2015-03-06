var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

module.exports = function(db) {

	//User
	var user_schema = new Schema({
		official_name : String,
		website : String,
		description : String,
		token_name : String,
		online : Boolean,
		priv_key : Object,
		pub_key : Object,
		wallet : Object,
		address_book : [{
			user_id : String
		}],
		likes : [{
			user_id : String
		}],
		local : {
			email : String,
			password : String,
			token : String
		},
		facebook : {
	        id : String,
	        token : String,
	        email : String,
	        name : String
	    },
	    twitter : {
	        id : String,
	        token : String,
	        displayName : String,
	        username : String
	    },
	    google : {
	        id : String,
	        token : String,
	        email : String,
	        name : String
	    }
	});
	
	//Create Auths
	user_schema.methods.signInLocal = function(email,password){
		this.local.email = email;
		this.local.password = password;
		this.local.token = generateToken(6);
	}
	user_schema.methods.signInFB = function(id,name,email,token){
		this.facebook.id = id;
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.signInTW = function(id,displayName,username,token){
		this.twitter.id = id;
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.signInGG = function(id,name,email,token){
		this.google.id = id;
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	//LogIn
	user_schema.methods.logInLocal = function(){
		this.online = true;
	}
	user_schema.methods.logInFB = function(name,email,token){
		this.online = true;
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.logInTW = function(displayName,username,token){
		this.online = true;
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.logInGG = function(name,email,token){
		this.online = true;
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	//LogOut
	user_schema.methods.LogOut = function(){
		this.online = false;
		this.google.token = null;
		this.twitter.token = null;
		this.facebook.token = null;
	}

	db.users = db.model('users', user_schema);

};

var generateToken = function(lenght){
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < lenght; i++ )
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;
}