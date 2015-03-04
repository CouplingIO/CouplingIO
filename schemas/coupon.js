var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

module.exports = function(db) {

	//Coupon
	var coupon_schema = new Schema({
		user : {type: Schema.ObjectId, ref: user_schema, required: true},
		amountIssued : {type: Number, required: true},
		expirationDate : {type: Date, required: true}
	});

	coupon_schema.methods.issue = function(user_id, amount, expirationDate){
		this.user = user_id;
		this.amountIssued = amount;
		this.expiration = expirationDate;
	}

	db.coupons = db.model('coupons', coupon_schema);

};
