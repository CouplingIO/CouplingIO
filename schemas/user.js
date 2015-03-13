var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db,bitcore) {

	//User
	var user_schema = new Schema({
		official_name : String,
		website : String,
		description : String,
		token_name : String,
		online : Boolean,
		priv_key : Object,
		pub_key : Object,
		address : Object,
		address_book : [{
			user_id : String
		}],
		likes : [{
			user_id : String
		}],
		session_token : String,
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

	//Fill new user
	user_schema.methods.fillUser = function(){
		this.official_name = null;
		this.website = null;
		this.description = null;
		this.token_name = "Couplings";
		this.online = true;
		this.priv_key = new bitcore.PrivateKey();
		this.pub_key = this.priv_key.publicKey;
		this.address = this.pub_key.toAddress();
		this.address_book = [];
		this.likes = [];
		this.session_token = null;
		this.facebook = {};
	    this.twitter = {};
	    this.google = {};
	}
	
	//SignIn
	user_schema.methods.signInFB = function(id,name,email,token){
		this.fillUser();
		this.online = true;
		this.official_name = name;
		this.session_token = generateToken(6);
		this.facebook.id = id;
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.signInTW = function(id,displayName,username,token){
		//this.fillUser();
		this.online = true;
		this.official_name = displayName;
		this.session_token = generateToken(6);
		this.twitter.id = id;
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.signInGG = function(id,name,email,token){
		this.fillUser();
		this.online = true;
		this.official_name = name;
		this.session_token = generateToken(6);
		this.google.id = id;
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	//LogIn
	user_schema.methods.logInFB = function(name,email,token){
		this.online = true;
		this.session_token = generateToken(6);
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.logInTW = function(displayName,username,token){
		this.online = true;
		this.session_token = generateToken(6);
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.logInGG = function(name,email,token){
		this.online = true;
		this.session_token = generateToken(6);
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	//Link social network
	user_schema.methods.linkFB = function(id,name,email,token){
		this.facebook.id = id;
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.linkTW = function(id,displayName,username,token){
		this.twitter.id = id;
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.linkGG = function(id,name,email,token){
		this.google.id = id;
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