const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username }) {
  const user = await User.findOne({ username });
  if (user) {
    const token = jwt.sign({ sub: user._id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }
  const user = new User(userParam);
  // save user
  await user.save();
  const newUser = await User.findOne({ username: userParam.username });
  if (newUser) {
    const token = jwt.sign({ sub: newUser._id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...newUser.toJSON(),
      token,
    };
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
