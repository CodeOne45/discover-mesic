require("rootpath")();
const session = require('express-session');
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const passport = require('passport');
const PORT = process.env.PORT || 8080;
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./models/users/users.controller"));
app.use("/songs", require("./models/songs/songs.controller"));
app.use("", require("./models/googleAuthentification/google.controller"));

// global error handler
app.use(errorHandler);



app.listen(PORT, () => {
  console.log("-----> Running API server...")
  console.log("-----> Server started on : localhost:" + PORT);
});
/*
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.set('view engine', 'ejs');
app.get('/success', (req, res) => res.send(userProfile));

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
  */