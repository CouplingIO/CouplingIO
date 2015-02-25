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

	var coupon = new Schema({
		amountIssued	: Number,
		expiration		: Date,
	});

	coupon.methods.issue = function(amount, expirationDate){
		this.amountIssued = amount;
		this.expiration = expirationDate;
	}

	db.coupons = db.model('coupons', coupon);

};
