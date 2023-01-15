const fs = require("fs");

class FileWatcher {
  path;
  constructor(path) {
    this.path = path;
  }

  startWatch() {
    console.log(`Watching for file changes on ${this.path}`);
    fs.watchFile(this.path, (curr, prev) => {
      console.log(`${this.path} file Changed`);
    });
  }
}

class FileDB {
  contents;
  path;
  constructor(path) {
    this.path = path;
    this.contents = {};
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.log(
          `File ${this.path} does not exists initializing with empty DB`
        );
      } else {
        this.contents = JSON.parse(data);
      }
    });
  }

  #saveData() {
    let data = JSON.stringify(this.contents, null, 2);
    fs.writeFile(this.path, data, (err) => {
      if (err) throw err;
    });
  }

  setValue(key, value) {
    this.contents[key] = value;
    this.#saveData();
  }

  getValue(key) {
    return this.contents[key];
  }

  getKeys() {
    return Object.keys(this.contents);
  }

  deleteKey(key) {
    delete this.contents[key];
    this.#saveData();
  }
}

module.exports = {
  FileDB,
};
