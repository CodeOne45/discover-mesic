const config = require("config.json");
const mongoose = require("mongoose");
require('dotenv').config()

console.log(process.env.MONGODB_URI);
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "DiscoverMesicDB", // Explicitly specify the database name here
};
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
).then(() => {
  console.log('-----> DB connected to DiscoverMesicDB');
  console.log('-----> API running...');
}).catch(err => {
  console.error('App starting error:', err.stack);
  process.exit(1)
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/users/user.model"),
  Songs: require("../models/songs/songs.model"),
  Tokens: require("../models/tokens/token.model"),
};
