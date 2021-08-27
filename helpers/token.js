const { store } = require("../store");

const validateToken = (token) => {
  return new Promise((resolve, reject) => {
    const data = store.getToken(token);
    if (!data) {
      reject("No token found");
    } else {
      const { email, expirationTime, used } = data;
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        reject("Token has expired");
      } else if (used) {
        reject("Token already used");
      } else {
        resolve({ email });
      }
    }
  });
};

module.exports = {
  validateToken,
};
