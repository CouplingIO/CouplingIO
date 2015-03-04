var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var keys = {
    'facebook' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:3010/auth/facebook/callback'
    },
    'twitter' : {
        'consumerKey'       : 'Z45cS51JKHYabEYKKu0y6EgEH',
        'consumerSecret'    : 'MXXFOLSE4WQSBnU5seh3Lis5Y5WsEbS1IqtSiimPdPIVR7jLhl',
        'callbackURL'       : 'http://localhost:3010/auth/twitter/callback'
    },
    'google' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
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
            // check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        // Created but need update
                        if (!user.facebook.token) {
                            user.updateFB(profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                else    
                                    return done(null, user);
                            });
                        }
                        // User found
                        return done(null, user); 
                    } else {
                        // Create User
                        var newUser = new db.users();
                        newUser.createFB(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else 
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                // Link accounts
                var user = req.user;
                user.createFB(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
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
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.updateTW(profile.displayName,profile.username,token);
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
                        // if there is no user, create them
                        var newUser = new db.users();
                        newUser.createTW(profile.id,profile.displayName,profile.username,token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user; // pull the user out of the session
                user.createTW(profile.id,profile.displayName,profile.username,token);
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
            // check if the user is already logged in
            if (!req.user) {
                db.users.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    else if (user) {
                        // Created but need update
                        if (!user.google.token) {
                            user.updateGG(profile.displayName,(profile.emails[0].value || '').toLowerCase(),token);
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                else    
                                    return done(null, user);
                            });
                        }
                        // User found
                        return done(null, user); 
                    } else {
                        // Create User
                        var newUser = new db.users();
                        newUser.createGG(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else 
                                return done(null, newUser);
                        });
                    }
                });
            } else {
                // Link accounts
                var user = req.user;
                user.createGG(profile.id,profile.name.givenName + ' ' + profile.name.familyName,(profile.emails[0].value || '').toLowerCase(),token);
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
