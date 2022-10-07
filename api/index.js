require("rootpath")();
const session = require('express-session');
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./models/users/users.controller"));
app.use("/songs", require("./models/songs/songs.controller"));
app.use("", require("./models/googleAuthentification/google.controller"));

// global error handler
app.use(errorHandler);



app.listen(PORT, () => {
  console.log("-----> Running API server...")
  console.log("-----> Server started on : " + PORT);
});
