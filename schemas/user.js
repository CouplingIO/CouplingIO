var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db) {

	var user = new Schema({
		username : String,
		password : String,
	});

	user.methods.create = function(newUsername,newPassword){
		this.username = newUsername;
		this.password = newPassword;
	}

	user.methods.changePass = function(newPassword){
		this.password = newPassword;
		this.save();
	}

	db.users = db.model('users', user);

};
