const config = require("config.json");
const db = require("_helpers/db");
const tools = require("_helpers/tools");
const Songs = db.Songs;
require('dotenv').config()

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
    getTotalLikesbyUsername
};

async function getTotalLikesbyUsername(artistName, res){
    let totalLikes = 0;
    const listSongs = await Songs.find({ author:
        { $regex: new RegExp("^" + artistName.toLowerCase(), "i") }});
    listSongs.forEach(song => totalLikes+=song.numberOfLikes);
    if (totalLikes == 0) {
        return res.status(200).json({totalLikes : totalLikes});
    }
    return res.status(200).json({totalLikes : totalLikes});
}
async function getSongByArtist(artistName, res){
    const listSongByArtist = await Songs.find({ author:
          { $regex: new RegExp("^" + artistName.author.toLowerCase(), "i") } });
    if (listSongByArtist.length === 0) {
        return res.status(400).json({message : "Artist has no song"});
    }
    return res.status(200).json(listSongByArtist);

}
async function getAll() { 
    var numberofSongs;
   await Songs.countDocuments().then((count) => {
     numberofSongs =  count;
});
    return await Songs.aggregate([{ $sample: { size: numberofSongs } }]);
}

async function getById(id) {
    return await Songs.findById(id);
}

async function create(songParam, res) {
    /*if (await Songs.findOne({ username: songParam.yt_id })) {
        throw 'Song name "' + songParam.title + '" is already taken';
    }*/
    songParam.yt_id = tools.YouTubeGetID(songParam.yt_id);

    if (!tools.checkYTview(songParam.yt_id)) {
         return res.status(400).json({message :'Song is already famous !'});
    }

    const song = new Songs(songParam);
    //save song in db
    await song.save();
    return res.status(200).json(song);

}
// get all musics added by a user with its id
async function getSongsByUser(id, res) {
    const listSongByUser = await Songs.find({ addedBy: id });
    if (listSongByUser.length === 0) {
        return res.status(400).json({message : "list is empty"});
    }
    return res.status(200).json(listSongByUser);
}
async function getRandomMusic() {
    const randomSong = await Songs.aggregate([{ $sample: { size: 1 } }]);
    return randomSong;
}

async function getTopTenSongs() {
    const listTopSongs = await Songs.find().sort({ "numberOfLikes": -1 }).limit(10);
    return listTopSongs;

}

async function update(id, songParam) {

}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
