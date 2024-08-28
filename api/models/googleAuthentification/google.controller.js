const express = require("express");
const router = express.Router();
const googleService = require("./google.service");
const db = require("../../_helpers/db");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const User = db.User;

router.get("/auth/google", googleService.passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/error' }),
  
async function (req, res) {
  // Successful authentication, redirect success.
  res.redirect('/logGoogle/success');
  ;
});

router.get('/logGoogle/success', async function (req, res){ 
  let vUsername = userProfile.emails[0].value.split("@")[0];
  let vEmail = userProfile.emails[0].value;
  let user = await User.findOne( { email: vEmail });
  let userParam;
  if(user){
    userParam = {
      username: user.username,
      email: user.email,
      isVerified: true
    };
  }
  if(!user){
   userParam = {
    username: vUsername,
    email: vEmail,
    password: " ",
    isVerified: true
  };
   // create User
    user = new User(userParam);
   // save user
    user = await user.save();
}
    const token = jwt.sign({ sub: user._id }, config.secret, {
      expiresIn: "7d",
    });
    
  
  res.send({userParam :userParam, token : token});
});


module.exports = router;

