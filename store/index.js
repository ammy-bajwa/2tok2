class Store {
  user = null;
  setUser(user) {
    this.user = user;
  }
  isUserAdmin() {
    return this.user?.admin;
  }
}

export const store = new Store();
