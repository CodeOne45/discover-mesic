const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  yt_id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true},
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("Songs", schema);