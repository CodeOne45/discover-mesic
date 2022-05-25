const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const mongoose = require('mongoose');
const emailCheck = require('email-check');
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  authenticate,
  getUserPlaylistSongs,
  updateUserPlaylistSongs,
  deleteUserPlaylistSongs,
};

async function authenticate(userAuthentification) {
  try {
    var user = await User.findOne({ $or: [{ username: userAuthentification.username }, { email: userAuthentification.username }] });
    const comparePassword = await bcrypt.compare(userAuthentification.password, user.password);
    if (comparePassword) {
      const token = jwt.sign({ sub: user._id }, config.secret, {
        expiresIn: "7d",
      });
      return {
        ...user.toJSON(),
        token,
      };
    } else {
      throw "Wrong username or password.";
    }

  } catch (error) {
    throw "Wrong username or password.";

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
  if (!isValidEmail(userParam.email) || userParam.email == '') {
    throw 'Email is invalid';
  }
  if (!emailCheck(userParam.email)) {
    throw 'Email do not exist';
  }
  // test password
  if (isValidatePassword(userParam.password) == false || userParam.password == '') {
    throw 'Password is invalid';
  }
  userParam.password = bcrypt.hashSync(userParam.password);
  // create User
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
  // hash password if it was entered
  if (userParam.password) {
    // verify new password
    if (isValidatePassword(userParam.password)) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    } else {
      throw 'Password is invalid, you need to have 1 Maj, 1 Min, 1 Number and 1 Caracter special';
    }
  }
  // copy userParam properties to user
  Object.assign(user, userParam);
  await user.save();
}
// recuperer la playlist de l'utilisateur connecté
async function getUserPlaylistSongs(id){
  const user = await User.findById(id);
  console.log(user);
  return user.playlistIdSongs;
}
// update la playlist utilisateur quand il ajoute une musique
async function updateUserPlaylistSongs(id,param){
  const user = await User.findById(id);
  user.playlistIdSongs.push(param.idMusic)
  user.save();
  return user.toJSON();
}
async function deleteUserPlaylistSongs(id,param){
  
  var listSongToRemove = param.idMusic.map(s => s.toString());
  await User.updateOne( // select your doc in moongo
  {_id: id}, // your query, usually match by _id
  { $pullAll: { playlistIdSongs : listSongToRemove } }, // item(s) to match from array you want to pull/remove
  { multi: true } // set this to true if you want to remove multiple elements.
  )
}
async function _delete(id) {
  await User.findByIdAndRemove(id);
}
function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
function isValidatePassword(password) {
  var newPassword = password;
  var minNumberofChars = 8;
  var maxNumberofChars = 16;
  var regularExpression = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,16})')
  if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
    return false;

  }
  if (!regularExpression.test(String(newPassword))) {
    return false;

  }
  return true;
}
