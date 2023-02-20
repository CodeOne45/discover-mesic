const songsService = require("../../models/songs/songs.service");
const userService = require("../../models/users/user.service")
const { checkYTview } = require("../../_helpers/tools");
async function testMusic50kViews(){
   let listeMusique = await songsService.getAll();

   for (const s of listeMusique){
    var isInferior50k = await checkYTview(s.yt_id)
    if(!isInferior50k){
        await songsService.delete(s._id)
        console.log("Worker: Song " + s.title + " was deleted !")
        if(s.addedBy){
        sendEmailFamousSong(s)
        }
    }
   }

 }
 async function sendEmailFamousSong(song){
    const User = await userService.getById(song.addedBy)
    userService.sendFamousSongEmail(User, song)
    console.log("We warned the user who added the song : " + User.username )
 }
module.exports  = () => {
    testMusic50kViews()
}

 