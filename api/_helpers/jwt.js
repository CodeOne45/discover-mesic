const expressJwt = require("express-jwt");
const config = require("config.json");
const userService = require("../models/users/user.service");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require token
      "/users/register",
      "/songs/newsong",
      "/songs/songs",
      "/users/login",
      "/auth/google",
      "/auth/google/callback",
      "/logGoogle/success",
      /^\/users\/verify\/.*/,
      "/songs/artistSongs",
    ],  
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
