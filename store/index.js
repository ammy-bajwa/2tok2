const store = {
  user: null,
  tokens: {},
  setToken(key, value) {
    // Key = "abc@gmail.com", value = {token: "123123", expiresIn: 376475}
    this.tokens[key] = value;
  },
  getToken(key) {
    return this.tokens[key];
  },
  setUser(user) {
    this.user = user;
  },
  isUserAdmin() {
    return this.user?.admin;
  },
};

module.exports = {
  store,
};
