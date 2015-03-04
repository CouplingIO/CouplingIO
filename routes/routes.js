var express = require('express');
var async = require('async');
var request = require('request');
var router = express.Router();

exports.index = function(req, res){
    res.render('index.html');
};

exports.partials = function(req,res) {
    res.render('partials/' + req.params.name);
};

exports.login = function(req, res){
    console.log(req.query);
    res.json({success:true});
};

exports.register = function(req, res){
    console.log(req.query);
    var newUser = new req.db.users();
    newUser.create(req.query.first_name,req.query.last_name,req.query.email,req.query.token);
    newUser.save(function(err){
    	if (err){
    		console.log(err);
    		res.json({success:false});
    	} else {
    		res.json({success:true});
    	}
    });
};

exports.issueCoupon = function(req, res){
    console.log(req.query);
    var newCoupon = new req.db.coupons();
    newCoupon.issue(req.query.issueAmount, req.query.expirationDate);
    newCoupon.save(function(err){
        if (err){
            console.log(err);
            res.json({success:false});
        } else {
            res.json({success:true});
        }
    });
};

exports.createWallet = function(req, res){
    
};



