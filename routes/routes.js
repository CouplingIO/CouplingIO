var express = require('express');
var async = require('async');
var request = require('request');
var cWallet = require('cc-wallet-core');
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

exports.changePass = function(req, res){
    console.log(req.query);
    req.db.users.findOne({username:req.query.username},{},function(err,user){
    	if (err){
    		console.log(err);
    		res.json({success:false});
    	} else {
    		if (user){
    			user.changePass(req.query.newPassword);
    			user.save(function(err){
			    	if (err){
			    		console.log(err);
			    		res.json({success:false});
			    	} else {
			    		res.json({success:true});
			    	}
			    });
    		} else {
    			console.log("user not exist");
    			res.json({success:false});
    		}
    	}
    })

};

exports.register = function(req, res){
    console.log(req.query);
    var newUser = new req.db.users();
    newUser.create(req.query.username,req.query.pass);
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
    var wallet = new cWallet.Wallet({testnet:true});
    console.log(wallet);

    //Parse circular structure of wallet and return it
    var cache = [];
    res.json(JSON.parse(JSON.stringify(wallet, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    })));
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

