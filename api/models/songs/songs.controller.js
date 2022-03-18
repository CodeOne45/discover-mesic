const express = require("express");
const router = express.Router();
const songService = require("./songs.service");
// routes
router.post("/newsong", addSong);
router.get("/songs", getAll);

module.exports = router;

function addSong(req, res, next) {
  console.log("---------> Adding song ..." );
  songService
    .create(req.body)
    .then((song) => res.json({ song }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  songService
    .getAll()
    .then((songs) => res.json(songs))
    .catch((err) => next(err));
}
