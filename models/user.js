const { PouchyStore } = require("fajri-pouchy-store");

class UserStore extends PouchyStore {
    get name() {
      return 'user';
    }
  
    get isUseRemote() {
      return false;
    }
  
    get single() {
      return this.name;
    }
}

module.exports = new UserStore;