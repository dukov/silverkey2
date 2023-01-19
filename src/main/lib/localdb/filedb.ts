import fs from "fs";

class FileWatcher {
  path: fs.PathLike;
  constructor(path: fs.PathLike) {
    this.path = path;
  }

  startWatch() {
    console.log(`Watching for file changes on ${this.path}`);
    fs.watchFile(this.path, (curr, prev) => {
      console.log(`${this.path} file Changed`);
    });
  }
}

export class FileDB {
  contents: { [x: string]: any; };
  path: fs.PathOrFileDescriptor;
  constructor(path: fs.PathOrFileDescriptor) {
    this.path = path;
    this.contents = {};
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.log(
          `File ${this.path} does not exists initializing with empty DB`
        );
      } else {
        this.contents = JSON.parse(data.toString("utf-8"));
      }
    });
  }

  #saveData() {
    let data = JSON.stringify(this.contents, null, 2);
    fs.writeFile(this.path, data, (err) => {
      if (err) throw err;
    });
  }

  setValue(key: string | number, value: any) {
    this.contents[key] = value;
    this.#saveData();
  }

  getValue(key: string | number) {
    return this.contents[key];
  }

  getKeys() {
    return Object.keys(this.contents);
  }

  deleteKey(key: string | number) {
    delete this.contents[key];
    this.#saveData();
  }
}

