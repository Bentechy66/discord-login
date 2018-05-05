var express  = require('express')
session = require('express-session')
passport = require('passport')
Strategy = require('passport-discord').Strategy
config = require("./config.json")
app  = express()

passport.serializeUser(function(user, done) {
  done(null, user)
});
passport.deserializeUser(function(obj, done) {
  done(null, obj)
});

var scopes = ['identify', 'email', /* 'connections', (it is currently broken) */ 'guilds', 'guilds.join']

passport.use(new Strategy({
    clientID: config.OauthID,
    clientSecret: config.OauthSecret,
    callbackURL: 'http://localhost:5000/callback',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile)
    })
}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize())
app.use(passport.session())

//Set up le routes
require("./routes")(app, passport, scopes)


//Start le server
app.listen(5000, function (err) {
    if (err) return console.log(err)
    console.log('Listening at http://localhost:5000/')
})
