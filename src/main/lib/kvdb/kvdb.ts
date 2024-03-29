import { FileDB } from "../localdb/filedb";
import { KVDB } from "./types";

const KVDB_DRIVERS: { [drvName: string]: (url: string) => KVDB } = {
  localfile: (url: string) => {
    return new FileDB(url);
  },
};

export class KVDBClient {
  selectedDB = "";
  private dbs: { [name: string]: KVDB } = {};
  getDBNames(): string[] {
    return Object.keys(this.dbs);
  }
  addDB(name: string, driver: string, url: string) {
    if (!(driver in KVDB_DRIVERS)) {
      throw new Error(`Unknown KVDB driver ${driver}`);
    }
    const drvFactory = KVDB_DRIVERS[driver];
    this.dbs[name] = drvFactory(url);
  }
  setValue(key: string, value: string): void {
    this.dbs[this.selectedDB].setValue(key, value);
  }
  getValue(key: string): string {
    return this.dbs[this.selectedDB].getValue(key);
  }
  getKeys(): string[] {
    return this.dbs[this.selectedDB].getKeys();
  }
  deleteKey(key: string): void {
    this.dbs[this.selectedDB].deleteKey(key);
  }
}
