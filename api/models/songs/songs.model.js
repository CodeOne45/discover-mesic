const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID
const Schema = mongoose.Schema;

const songSchema = new Schema({
  yt_id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true},
  addedBy: { type: ObjectID},
  numberOfLikes : { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  dateInsertion : {  type : Date, default: Date.now},
  isVerified: {type: Boolean,default: false},
  profile_pic_url: { type: String, default: "" },
  channelID: { type: String, required: true }
});

songSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("Songs", songSchema);