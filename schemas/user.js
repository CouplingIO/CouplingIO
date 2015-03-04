var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

module.exports = function(db) {

	//User
	var user_schema = new Schema({
		facebook         : {
	        id           : String,
	        token        : String,
	        email        : String,
	        name         : String
	    },
	    twitter          : {
	        id           : String,
	        token        : String,
	        displayName  : String,
	        username     : String
	    },
	    google           : {
	        id           : String,
	        token        : String,
	        email        : String,
	        name         : String
	    }
	});
	
	//Create Auths
	user_schema.methods.createFB = function(id,name,email,token){
		this.facebook.id = id;
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.createTW = function(id,displayName,username,token){
		this.twitter.id = id;
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.createGG = function(id,name,email,token){
		this.google.id = id;
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	//Update Auths
	user_schema.methods.updateFB = function(id,name,email,token){
		this.facebook.name = name;
		this.facebook.email = email;
		this.facebook.token = token;
	}
	user_schema.methods.updateTW = function(id,displayName,username,token){
		this.twitter.displayName = displayName;
		this.twitter.username = username;
		this.twitter.token = token;
	}
	user_schema.methods.updateGG = function(id,name,email,token){
		this.google.name = name;
		this.google.email = email;
		this.google.token = token;
	}

	// generating a hash
	user_schema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	user_schema.methods.validPassword = function(password) {
	    return bcrypt.compareSync(password, this.local.password);
	};

	db.users = db.model('users', user_schema);

};
