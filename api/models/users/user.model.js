const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeRole = {
  roleArtiste: 'artiste',
  roleAdmin: 'admin',
  roleUtilisateur: 'utilisateur'
}

const Userschema = new Schema({
  username: { type: String, unique: true, required: true },
  email :{ type: String, unique: true, required:true},
  password : {type: String, required: true},
  playlistIdSongs : [{type : String}],
  role : {type : typeRole, default: typeRole.roleUtilisateur},
  listIdSongsSwiptoLeft : [{type: String , default:[]}]
});

Userschema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("User", Userschema);
