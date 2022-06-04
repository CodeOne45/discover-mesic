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
  listIdSongsSwiptoLeft : [{type: String , default:[]}],
  isVerified: {type: Boolean,default: false}
});

Userschema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hash;
  },
});

Userschema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
      id: this._id,
      email: this.email,
      username: this.username
  };

  return jwt.sign(payload, config.secret, {
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};


module.exports = mongoose.model("User", Userschema);
