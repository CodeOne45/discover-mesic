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
};

async function getAll() {
    return await Songs.find();
}
  
async function getById(id) {
    return await Songs.findById(id);
}

async function create(songParam){
    /*if (await Songs.findOne({ username: songParam.yt_id })) {
        throw 'Song name "' + songParam.title + '" is already taken';
    }*/

    songParam.yt_id = tools.YouTubeGetID(songParam.yt_id);

    if (!tools.checkYTview(songParam.yt_id)){
        throw 'Song is already famous !';
    }

    const song = new Songs(songParam);
    //save song in db
    await song.save();
}


async function update(id, songParam) {
    
}
  
async function _delete(id) {
    await User.findByIdAndRemove(id);
}
  