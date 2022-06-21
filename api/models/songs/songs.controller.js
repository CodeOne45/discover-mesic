const express = require("express");
const router = express.Router();
const songService = require("./songs.service");
// routes
router.post("/newsong", addSong);
router.get("/songs", getAll);
router.get("/byUser/:userId", getSongsByUser);
router.get("/randomSong",getRandomMusic);
router.get("/TopTen",getTopTenSongs);
router.get("/artistSongs", getSongByArtist);
module.exports = router;

function addSong(req, res, next) {
  songService
    .create(req.body, res)
    .catch((err) => next(err));
}
function getSongByArtist(req, res, next){
  songService
  .getSongByArtist(req.body, res)
  .catch((err) => next(err));
}

function getAll(req, res, next) {
  songService
    .getAll()
    .then((songs) => res.json(songs))
    .catch((err) => next(err));
}

function getSongsByUser(req, res, next){
  songService.
  getSongsByUser(req.params.userId, res)
  .catch((err) => next(err));
}
function getRandomMusic(req, res,next){
  songService.
    getRandomMusic()
    .then((randomSong) => (randomSong ? res.json(randomSong) : res.sendStatus(404)))
    .catch((err) => next(err));
}
function getTopTenSongs(req, res,next){
  songService.
  getTopTenSongs()
    .then((listTopSongs) => (listTopSongs ? res.json(listTopSongs) : res.sendStatus(404)))
    .catch((err) => next(err));
}
