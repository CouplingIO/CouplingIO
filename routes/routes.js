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
    res.json({success:true});
};

exports.issueCoupon = function(req, res){
    console.log(req.query);
    res.json({success:true});
};



