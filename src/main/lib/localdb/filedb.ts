import fs from "fs";

// eslint-disable-next-line
class FileWatcher {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  startWatch() {
    console.log(`Watching for file changes on ${this.path}`);
    fs.watchFile(this.path, () => {
      console.log(`${this.path} file Changed`);
    });
  }
}

export class FileDB {
  contents: { [x: string]: string };
  path: string;
  constructor(path: string) {
    this.path = path;
    this.contents = {};
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.log(
          `File ${this.path} does not exists initializing with empty DB`
        );
      } else {
        // eslint-disable-next-line
        this.contents = JSON.parse(data.toString("utf-8"));
      }
    });
  }

  #saveData(): void {
    const data = JSON.stringify(this.contents, null, 2);
    fs.writeFile(this.path, data, (err) => {
      if (err) throw err;
    });
  }

  setValue(key: string, value: string): void {
    this.contents[key] = value;
    this.#saveData();
  }

  getValue(key: string): string {
    return this.contents[key];
  }

  getKeys(): string[] {
    return Object.keys(this.contents);
  }

  deleteKey(key: string): void {
    delete this.contents[key];
    this.#saveData();
  }
}
