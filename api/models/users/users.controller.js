const express = require("express");
const router = express.Router();
const userService = require("./user.service");



// routes
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:_id", getById);
router.put("/:_id", update);  
router.delete("/:_id", _delete);
router.post("/login", authenticate);
router.get("/playlist/:userId",getUserPlaylistSongsById);
router.put("/playlist/:userId", updateUserPlaylistSongs);
router.delete("/playlist/:userId", deleteUserPlaylistSongs);
router.get("/playlistToLeft/:userId",getUserPlaylistSongsLeftById);
router.put("/playlistToLeft/:userId",updateUserPlaylistSongsSwipLeft);
//EMAIL Verification
router.get("/verify/:token", getUserEmailVerify);
router.post("/resend", resendTokenEmailVerification);
router.put("/updatePassword/:userId", updateUserPassword);
module.exports = router;



function authenticate(req, res, next) {
  userService
    .authenticate(req.body, res)
    .then((user) =>
    user
      ? res.json(user)
      : res.status(400).json({ message: "Username or password is incorrect" })
  )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body,req, res)
    .catch((err) => next(err));
}
function update(req, res, next) {
  userService
    .update(req.params._id, req.body,res)
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params._id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}


function getUserPlaylistSongsById(req, res, next) {
  userService
    .getUserPlaylistSongs(req.params.userId, res)
    .catch((err) => next(err));
}
function getUserPlaylistSongsLeftById(req, res, next) {
  userService
    .getUserPlaylistSongsLeftById(req.params.userId, res)
    .catch((err) => next(err));
}
function updateUserPlaylistSongsSwipLeft(req, res, next) {
  userService
  .updateUserPlaylistSongsSwipLeft(req.params.userId, req.body, res)
  .catch((err) => next(err));
}
function updateUserPlaylistSongs(req, res, next) {
    userService
    .updateUserPlaylistSongs(req.params.userId, req.body, res)
    .catch((err) => next(err));
}
function deleteUserPlaylistSongs(req, res, next) {
    userService
  .deleteUserPlaylistSongs(req.params.userId, req.body, res)
  .catch((err) => next(err));
}
function updateUserPassword(req, res, next){
  userService
  .updateUserPassword(req.params.userId, req.body, res)
  .catch((err) => next(err));
}
function _delete(req, res, next) {
  userService
    .delete(req.params._id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getUserEmailVerify(req, res, next){
  userService
    .verify(req, res)
    .catch((err) => next(err));
}

function resendTokenEmailVerification(req, res, next){
  userService
    .resendToken(req, res)
    .catch((err) => next(err));
}