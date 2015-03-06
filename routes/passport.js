var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var keys = {
    'facebook' : {
        'clientID'      : 'your-secret-clientID-here', 
        'clientSecret'  : 'your-client-secret-here', 
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

    //Facebook
    passport.use(new FacebookStrategy({
        clientID        : keys.facebook.clientID,
        clientSecret    : keys.facebook.clientSecret,
        callbackURL     : keys.facebook.callbackURL,
        passReqToCallback : true
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            if (!req.user) {
                db.users.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        //Update facebook token to log in
                        if (!user.facebook.token) {
                            user.logInFB(profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
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
                        // Create User
                        var newUser = new db.users();
                        newUser.signInFB(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else 
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                //Link google account to existing user
                var user = req.user;
                user.signInFB(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                user.save(function(err) {
                    if (err)
                        return done(err);
                    else
                        return done(null, user);
                });
            }
        });
    }));

    //Twitter
    passport.use(new TwitterStrategy({
        consumerKey     : keys.twitter.consumerKey,
        consumerSecret  : keys.twitter.consumerSecret,
        callbackURL     : keys.twitter.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, tokenSecret, profile, done) {
        process.nextTick(function() {
            if (!req.user) {
                db.users.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        //Update twitter token to log in
                        if (!user.twitter.token) {
                            user.logInTW(profile.displayName,profile.username,token);
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                else
                                    return done(null, user);
                            });
                        } else{
                            return done(null, user);
                        }
                    } else {
                        //Create User
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
                //Link twitter account to existing user
                var user = req.user;
                user.signInTW(profile.id,profile.displayName,profile.username,token);
                user.save(function(err) {
                    if (err)
                        return done(err);
                    else
                        return done(null, user);
                });
            }
        });
    }));

    //Google
    passport.use(new GoogleStrategy({
        clientID        : keys.google.clientID,
        clientSecret    : keys.google.clientSecret,
        callbackURL     : keys.google.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            if (!req.user) {
                db.users.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        //Update google token to log in
                        if (!user.google.token) {
                            user.logInGG(profile.displayName,(profile.emails[0].value || '').toLowerCase(),token);
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
                        // Create User
                        var newUser = new db.users();
                        newUser.signInGG(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else 
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                //Link google account to existing user
                var user = req.user;
                user.signInGG(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
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
