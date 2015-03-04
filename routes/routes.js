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

function setupHandlers(app,handlers) {
    app.get('/auth/google',handlers.auth.googleSignIn);
    app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
    app.get('/auth/facebook',handlers.auth.facebookSignIn);
    app.get('/auth/facebook/callback',handlers.auth.facebookSignInCallback);
    app.get('/auth/local',handlers.auth.localSignIn);
    app.get('/auth/local/callback',handlers.auth.localSignInCallback);
    app.get('/user',handlers.user.getUsers);
    app.get('/user/:id',handlers.user.getUser);
    app.put('/user/:id',handlers.user.updateUser);
    app.get('/user/:first/:last/:email',handlers.user.createUser);
    console.log("Successfully set up routes");
};

exports.setupHandlers = setupHandlers;

