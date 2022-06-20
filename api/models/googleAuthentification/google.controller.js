const express = require("express");
const router = express.Router();
const googleService = require("./google.service");

router.get("/auth/google", loginWithGoogle);
router.get("/auth/google/callback", callBackGoogle);
module.exports = router;
 function loginWithGoogle(){
   googleService
   .loginWithGoogle();
}

function callBackGoogle(){
  googleService
  .callBackGoogle();
}