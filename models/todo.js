const { PouchyStore } = require("fajri-pouchy-store");
const config = require("../config");

class TodoStore extends PouchyStore {
    get name() {
        return config.name;
    }

    get urlRemote() {
        return config.couchDBUrl;
    }

    get optionsRemote() {
        return {
          auth: config.couchDBAuth,
        };
    }
}

module.exports = new TodoStore;