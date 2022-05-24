const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const bcrypt = require("bcrypt");
const User = db.User;
const emailCheck = require('email-check');
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  authenticate,
};

async function authenticate({ username }) {
  const user = await User.findOne({ username });
  if (user) {
    const token = jwt.sign({ sub: user._id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  // tester mail
  if(!isValidEmail(userParam.email) || userParam.email == ''){
    throw 'Email is invalid';
  }
  if(!emailCheck(userParam.email)){
    throw 'Email do not exist';
  } 
  // tester password
  if(validatePassword(userParam.password) == false || userParam.password == ''){
      throw 'Password is invalid';
  } 

  // création User
  const user = new User(userParam);
  // save user
  await user.save();
  const newUser = await User.findOne({ username: userParam.username });
  if (newUser) {
    const token = jwt.sign({ sub: newUser._id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...newUser.toJSON(),
      token,
    };
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
function validatePassword(password) {
  var newPassword = password;
  var minNumberofChars = 8;
  var maxNumberofChars = 16;
  console.log(newPassword.length)
  var regularExpression = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,16})')
  if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
      return false;
     
  }
  if(!regularExpression.test(String(newPassword))) {
    console.log("fff");
      return false;
     
  }
  return true;
}
