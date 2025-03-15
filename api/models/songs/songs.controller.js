const express = require("express");
const router = express.Router();
const songService = require("./songs.service");
// routes
router.post("/newsong", addSong);
router.get("/songs", getAll);
router.get("/byUser/:userId", getSongsByUser);
router.get("/randomSong", getRandomMusic);
router.get("/topten", getTopTenSongs);
router.post("/artistsongs", getSongByArtist);
router.get("/totallikes/:username", getTotalLikesbyUsername);
router.put("/increase/likes/:ytId", updateLikesIncrease);
// dicrease likes
router.put("/decrease/likes/:ytId", updateLikesDecrease);
module.exports = router;

function getTotalLikesbyUsername(req, res, next) {
  songService
    .getTotalLikesbyUsername(req.params.username, res)
    .catch((err) => next(err));
}
function addSong(req, res, next) {
  songService.create(req.body, res).catch((err) => next(err));
}
function getSongByArtist(req, res, next) {
  songService.getSongByArtist(req.body, res).catch((err) => next(err));
}

function getAll(req, res, next) {
  const { page, limit } = req.query; // e.g., /songs?page=2&limit=10
  songService
    .getAll(page, limit)
    .then((songs) => res.json(songs))
    .catch((err) => next(err));
}

function getSongsByUser(req, res, next) {
  songService.getSongsByUser(req.params.userId, res).catch((err) => next(err));
}
function getRandomMusic(req, res, next) {
  songService
    .getRandomMusic()
    .then((randomSong) =>
      randomSong ? res.json(randomSong) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}
function getTopTenSongs(req, res, next) {
  songService
    .getTopTenSongs()
    .then((listTopSongs) =>
      listTopSongs ? res.json(listTopSongs) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

// if route is /increase/likes/:ytId
function updateLikesIncrease(req, res, next) {
  songService
    .updateSongLikes(req.params.ytId, true, res)
    .catch((err) => next(err));
}
// if route is /decrease/likes/:ytId
function updateLikesDecrease(req, res, next) {
  songService
    .updateSongLikes(req.params.ytId, false, res)
    .catch((err) => next(err));
}

