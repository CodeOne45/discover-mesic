const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID
const Schema = mongoose.Schema;

const schema = new Schema({
  yt_id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true},
  addedBy: { type: ObjectID, required: true},
  numberOfLikes : { type: Number, required: true },
  dateInsertion : {  type : Date, default: Date.now}
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("Songs", schema);