const database = require("../db");
const bcrypt = require("bcrypt"); // bcrypt will encrypt passwords to be saved in db
const crypto = require("crypto");
const ethWallet = require("ethereumjs-wallet");
var eth = require("../ethProvider");

const signup = (request, response) => {
  const user = request.body;
  console.log("user", user);
  console.log("Wallet", ethWallet);
  let addressData = ethWallet.generate();
  user.private_key = addressData.getPrivateKeyString();
  user.token = addressData.getAddressString();
  eth.web3.eth.getBlock("latest").then((block) => {
    user.eth_block = block;
    hashPassword(user.password)
      .then((hashedPassword) => {
        delete user.password;
        user.password_digest = hashedPassword;
      })
      .then(() => createUser(user))
      .then((_user) => {
        global.users[_user.token] = _user.id;
        delete user.password_digest;
        request.session.loggedIn = true;
        request.session.loggedUser = _user;
        request.session.isAdmin = false;
        response.redirect("/home");
      })
      .catch((err) => {
        response.render("user/register", {
          messages: { error: "Something went wrong!" },
          layout: false,
        });
        console.error(err);
      });
  });
};
// app/models/user.js
const signin = (request, response,next) => {
  const userReq = request.body;
  let user;

  findUser(userReq)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then((loggedUser) => {
      delete user.password_digest;
      console.log("loggedUser", loggedUser);
      request.session.loggedIn = true;
      console.log("loggedUser", loggedUser);
      request.session.isAdmin = loggedUser.admin == 1;
      request.session.loggedUser = loggedUser;
      response.redirect("/home");
    })
    .catch((err) => {
      request.locals = {messages : { error: "Invalid credentials !" }}
      next.render(request,response,"/user/login",request.query);
      console.error(err);
    });
};
const findUser = (userReq) => {
  return database
    .raw("SELECT * FROM users WHERE email = ?", [userReq.email])
    .then((data) => data.rows[0]);
};
const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        if (response) {
          resolve(foundUser);
        } else {
          reject(new Error("Passwords do not match."));
        }
      } else {
        reject(new Error("Passwords do not match."));
      }
    })
  );
};
const updateUserToken = (token, user) => {
  return database
    .raw(
      "UPDATE users SET token = ? WHERE id = ? RETURNING id,email,admin, username, token",
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
      "INSERT INTO users (username,email, password_digest, token,eth_block, createdAt) VALUES (?,?, ?, ?,?, ?) RETURNING id, username,email, createdAt, token,eth_block",
      [user.username, user.email, user.password_digest, user.token,user.eth_block, new Date()]
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
