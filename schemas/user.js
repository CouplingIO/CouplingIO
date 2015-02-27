var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db) {

	var user_schema = new Schema({
		_id: Schema.Types.ObjectId
		,last_name: {type: String, required: true}
		,first_name: {type: String, required: true}
		,email: {type: String, required: true}
		,token: {type: String, required: false}
	});

	user_schema.methods.create = function(newUsername,newPassword){
		this.username = newUsername;
		this.password = newPassword;
	}

	user_schema.methods.changePass = function(newPassword){
		this.password = newPassword;
		this.save();
	}

	db.users = db.model('users', user_schema);

	var coupon_schema = new Schema({
		user : {type: Schema.ObjectId, ref: user_schema, required: true}
		amountIssued : {type: Number, required: true},
		expirationDate : {type: Date, required: true},
	});

	coupon.methods.issue = function(user_id, amount, expirationDate){
		this.user = user_id;
		this.amountIssued = amount;
		this.expiration = expirationDate;
	}

	db.coupons = db.model('coupons', coupon);

};
