const config = require("../../config.json");
const db = require("../../_helpers/db");
const tools = require("../../_helpers/tools");
const Songs = db.Songs;
require("dotenv").config();

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getSongsByUser,
  getRandomMusic,
  getTopTenSongs,
  getSongByArtist,
  getTotalLikesbyUsername,
  updateSongLikes,
  updateViews,
};

async function getTotalLikesbyUsername(artistName, res) {
  let totalLikes = 0;
  const listSongs = await Songs.find({
    author: { $regex: new RegExp("^" + artistName.toLowerCase(), "i") },
  });
  listSongs.forEach((song) => (totalLikes += song.numberOfLikes));
  if (totalLikes == 0) {
    return res.status(200).json({ totalLikes: totalLikes });
  }
  return res.status(200).json({ totalLikes: totalLikes });
}
async function getSongByArtist(artistName, res) {
  const listSongByArtist = await Songs.find({
    author: { $regex: new RegExp("^" + artistName.author.toLowerCase(), "i") },
  });
  if (listSongByArtist.length === 0) {
    return res.status(400).json({ message: "Artist has no song" });
  }
  return res.status(200).json(listSongByArtist);
}

async function getAll(page, limit) {
  // Parse query params or set defaults
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;
  
  // Get total number of documents
  const total = await Songs.countDocuments();
  
  // Use aggregation pipeline to add a random field, sort by it, and paginate
  const songs = await Songs.aggregate([
    { $addFields: { random: { $rand: {} } } },
    { $sort: { random: 1 } },
    { $skip: skip },
    { $limit: limit }
  ]);
  
  return {
    songs,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
}


async function getById(id) {
  return await Songs.findById(id);
}

async function create(songParam, res) {
  // Normalize the YouTube ID
  songParam.yt_id = tools.YouTubeGetID(songParam.yt_id);

  if (Array.isArray(songParam.yt_id)) {
    songParam.yt_id = songParam.yt_id[0];
  }

  if (await Songs.findOne({ yt_id: songParam.yt_id })) {
    return res.status(400).json({ message: "Song already taken!" });
  }

  // Check if the song meets your criteria (example: not too famous)
  const validView = await tools.checkYTview(songParam.yt_id);
  if (!validView) {
    return res.status(400).json({ message: "Song is already famous!" });
  }

  // Fetch additional video details
  const newSongParam = await tools.video_details(songParam);

  // Get view count from YouTube
  try {
    const views = await tools.getYTViews(songParam.yt_id);
    newSongParam.views = views; // add the views field
  } catch (error) {
    console.error("Failed to fetch views:", error);
    // Optionally, decide if you want to continue without views or fail the creation
    newSongParam.views = 0;
  }

  const song = new Songs(newSongParam);
  await song.save();
  return res.status(200).json(song);
}


// get all musics added by a user with its id
async function getSongsByUser(id, res) {
  const listSongByUser = await Songs.find({ addedBy: id });
  if (listSongByUser.length === 0) {
    return res.status(400).json({ message: "list is empty" });
  }
  return res.status(200).json(listSongByUser);
}
async function getRandomMusic() {
  const randomSong = await Songs.aggregate([{ $sample: { size: 1 } }]);
  return randomSong;
}

async function getTopTenSongs() {
  const listTopSongs = await Songs.find().sort({ numberOfLikes: -1 }).limit(10);
  return listTopSongs;
}

// TODO : Update likes after each swipe
async function update(id, res) {}

async function _delete(id) {
  await Songs.findByIdAndRemove(id);
}

// increase and decrease likes
async function updateSongLikes(idMusic, isIncrease){
    const song = await Songs.findOne({yt_id : idMusic});
    if (!song) throw "Error: Song not found!";
    if (isIncrease) {
        song.numberOfLikes += 1;
    } else {
        song.numberOfLikes -= 1;
    }
    await song.save();
    return song;
}

async function updateViews(songId, newViews) {
  // Use findByIdAndUpdate to update the views field and return the updated document.
  return await Songs.findByIdAndUpdate(songId, { views: newViews }, { new: true });
}


