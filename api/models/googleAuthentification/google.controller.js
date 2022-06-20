const express = require("express");
const router = express.Router();
const googleService = require("./google.service");
const db = require("_helpers/db");
const jwt = require("jsonwebtoken");
const config = require("config.json");
const User = db.User;
router.get("/auth/google", googleService.passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/error' }),
  async function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/logGoogle/success');
    ;
  });
router.get('/logGoogle/success', (req, res) => res.send(loginWithGoogle(userProfile)));
module.exports = router;

async function loginWithGoogle(userProfile) {
  
    console.log(userProfile)
    var vUsername = userProfile.emails[0].value.split("@")[0];
    var vEmail = userProfile.emails[0].value;
    console.log(vUsername)
    let userParam = {
      username: vUsername,
      email: vEmail,
      password: " ",
      isVerified: true
    };
     // create User
     const user = new User(userParam);
     // save user
     const user_ = await user.save();
    if (user_) {
      console.log("dd")
      const token = jwt.sign({ sub: user_._id }, config.secret, {
        expiresIn: "7d",
      });
      return {
        ...user_.toJSON(),
        token,
      };
    }
    
}
