var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var keys = {
    'facebook' : {
        'clientID'      : '660523004052804', 
        'clientSecret'  : '6b9e37b8045b46d9cc68c51088846f29', 
        'callbackURL'   : 'http://localhost:3010/auth/facebook/callback'
    },
    'twitter' : {
        'consumerKey'       : 'Z45cS51JKHYabEYKKu0y6EgEH',
        'consumerSecret'    : 'MXXFOLSE4WQSBnU5seh3Lis5Y5WsEbS1IqtSiimPdPIVR7jLhl',
        'callbackURL'       : 'http://localhost:3010/auth/twitter/callback'
    },
    'google' : {
        'clientID'      : '738881702552-t7ta31oc68pf9ujljftteu4v7h6v71oh.apps.googleusercontent.com',
        'clientSecret'  : 'wst49LrsAT0SGSa35j4cAeIf',
        'callbackURL'   : 'http://localhost:3010/auth/google/callback'
    }
};

module.exports = function(passport,db) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        db.users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID        : keys.facebook.clientID,
        clientSecret    : keys.facebook.clientSecret,
        callbackURL     : keys.facebook.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        // Log In
                        if (!user.facebook.token) {
                            user.logInFB(profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        } else {
                            return done(null, user);
                        }
                    } else {
                        // Sign in
                        var newUser = new db.users();
                        newUser.signInFB(profile.idprofile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else 
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                // Link account
                var user = req.user; 
                user.linkFB(profile.idprofile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                user.save(function(err) {
                    if (err)
                        return done(err);
                    else    
                        return done(null, user);
                });
            }
        });
    }));

    passport.use(new TwitterStrategy({
        consumerKey     : keys.twitter.consumerKey,
        consumerSecret  : keys.twitter.consumerSecret,
        callbackURL     : keys.twitter.callbackURL,
        passReqToCallback : true
    },
    function(req, token, tokenSecret, profile, done) {
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        // Log In
                        if (!user.twitter.token) {
                            user.logInTW(profile.displayName,profile.username,token);
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                else 
                                    return done(null, user);
                            });
                        } else {
                            return done(null, user);
                        }
                    } else {
                        //Sign in
                        var newUser = new db.users();
                        newUser.signInTW(profile.id,profile.displayName,profile.username,token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else  
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                // Link account
                var user = req.user;
                user.linkTW(profile.id,profile.displayName,profile.username,token);
                user.save(function(err) {
                    if (err)
                        return done(err);
                    else
                        return done(null, user);
                });
            }
        });
    }));

    passport.use(new GoogleStrategy({
        clientID        : keys.google.clientID,
        clientSecret    : keys.google.clientSecret,
        callbackURL     : keys.google.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            //Check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // LogIn
                        if (!user.google.token) {
                            newUser.logInGG(profile.displayName,(profile.emails[0].value || '').toLowerCase(),token)
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                else
                                    return done(null, user);
                            });
                        } else {
                            return done(null, user);
                        }
                    } else {
                        // Sign in
                        var newUser = new db.users();
                        newUser.signInGG(profile.id,profile.displayName,(profile.emails[0].value || '').toLowerCase(),token)
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                // Link account
                var user = req.user;
                user.linkGG(profile.id,profile.displayName,(profile.emails[0].value || '').toLowerCase(),token)
                user.save(function(err) {
                    if (err)
                        return done(err);
                    else
                        return done(null, user);
                });
            }
        });
    }));
};
