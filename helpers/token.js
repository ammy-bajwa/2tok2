const { store } = require("../store");

const validateToken = (token, email) => {
  return new Promise((resolve, reject) => {
    const data = store.getToken(email);
    if (!data) {
      reject("No token found");
    } else {
      const { email, expirationTime, used, token: memoryToken } = data;
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        reject("Token has expired");
      } else if (used) {
        reject("Token already used");
      } else if (token !== memoryToken) {
        reject("Token is invalid");
      } else {
        resolve({ email });
        store.setToken(email, { ...data, used: true });
      }
    }
  });
};

module.exports = {
  validateToken,
};
