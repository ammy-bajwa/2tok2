const database = require('../db')
const bcrypt = require("bcrypt"); // bcrypt will encrypt passwords to be saved in db
const crypto = require("crypto");

const signup = (request, response) => {
  const user = request.body;
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.password_digest = hashedPassword;
    })
    .then(() => createToken())
    .then((token) => (user.token = token))
    .then(() => createUser(user))
    .then((user) => {
      delete user.password_digest;
      response.status(201).json({ user });
    })
    .catch((err) => console.error(err));
};
// app/models/user.js
const signin = (request, response) => {
  const userReq = request.body;
  let user;

  findUser(userReq)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then((res) => createToken())
    .then((token) => updateUserToken(token, user))
    .then(() => {
      delete user.password_digest;
      response.status(200).json(user);
    })
    .catch((err) => console.error(err));
};
const findUser = (userReq) => {
  return database
    .raw("SELECT * FROM users WHERE username = ?", [userReq.username])
    .then((data) => data.rows[0]);
};
const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error("Passwords do not match."));
      }
    })
  );
};
const updateUserToken = (token, user) => {
  return database
    .raw(
      "UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token",
      [token, user.id]
    )
    .then((data) => data.rows[0]);
};
const authenticate = (userReq) => {
  findByToken(userReq.token).then((user) => {
    if (user.username == userReq.username) {
      return true;
    } else {
      return false;
    }
  });
};
const findByToken = (token) => {
  return database
    .raw("SELECT * FROM users WHERE token = ?", [token])
    .then((data) => data.rows[0]);
};
const userTransactions = (request, response) => {
  const userReq = request.body;
  if (authenticate(userReq)) {
  } else {
    response.status(404);
  }
};
// don't forget to export!
module.exports = {
  signin,
  signup,
  authenticate,
  updateUserToken,
  userTransactions,
};
// check out bcrypt's docs for more info on their hashing function
const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};
// user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
const createUser = (user) => {
  return database
    .raw(
      "INSERT INTO users (username, password_digest, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, username, created_at, token",
      [user.username, user.password_digest, user.token, new Date()]
    )
    .then((data) => data.rows[0]);
};
// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString("base64"));
    });
  });
};
