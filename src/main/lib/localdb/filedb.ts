import fs from "fs";
import { FREEPLANE_BASE } from "./constants";
import jsdom from "jsdom";
import { KVDB } from "../kvdb/types";

export const DB_FILE_NAME = "kvdb.mm";

// eslint-disable-next-line
class FileWatcher {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  startWatch(onChange: (curr: fs.Stats, prev: fs.Stats) => void) {
    console.log(`Watching for file changes on ${this.path}`);
    fs.watchFile(this.path, onChange);
  }
}

export class FileDB implements KVDB {
  contents: { [x: string]: string };
  path: string;
  private dbWatcher: FileWatcher;
  constructor(path: string) {
    this.path = path;
    this.contents = {};
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.log(
          `File ${this.path} does not exists initializing with empty DB`
        );
      } else {
        this.contents = new MindMap(data.toString("utf-8")).toDict();
      }
    });

    this.dbWatcher = new FileWatcher(this.path);
    this.dbWatcher.startWatch(() => {
      console.log("DB updated. Re-reading");
      try {
        const data = fs.readFileSync(this.path);
        this.contents = new MindMap(data.toString("utf-8")).toDict();
      } catch (e) {
        console.log("File re-read failed.");
      }
    });
  }

  #saveData(): void {
    const mm = new MindMap();
    mm.import(this.contents);
    const data = mm.serialize();
    fs.writeFileSync(this.path, data, { encoding: "utf8" });
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

class MindMap {
  private mm: jsdom.JSDOM;
  constructor(data?: string) {
    if (data) {
      this.mm = new jsdom.JSDOM(data, { contentType: "text/xml" });
    } else {
      this.mm = new jsdom.JSDOM(FREEPLANE_BASE, { contentType: "text/xml" });
    }
  }

  #readNodes(
    node: Element,
    key: string,
    value: string
  ): { [k: string]: string } {
    if (node.children.length == 0) {
      const res: { [k: string]: string } = {};
      res[key] = value;
      return res;
    }
    let res = {};
    let subKey: string;
    const newKey = key == "" ? value : `${key}/${value}`;
    for (const child of node.children) {
      if (child.tagName != "node") continue;
      subKey = child.getAttribute("TEXT") || "";
      res = {
        ...res,
        ...this.#readNodes(child, newKey, subKey),
      };
    }

    return res;
  }

  #newMMElement(name: string) {
    const res = this.mm.window.document.createElement("node");
    res.setAttribute("TEXT", name);
    res.setAttribute("POSITION", "right");
    return res;
  }

  #addNodes(jsonPath: string[], value: string, parent: Element) {
    if (jsonPath.length == 0) {
      parent.setAttribute("FOLDED", "true");
      parent.appendChild(this.#newMMElement(value));
    } else {
      const curKey = jsonPath[0];
      let keyChild: Element | null = null;
      for (const child of parent.children) {
        if (child.getAttribute("TEXT") == curKey) {
          keyChild = child;
          break;
        }
      }
      if (keyChild == null) {
        keyChild = this.#newMMElement(curKey);
        parent.appendChild(keyChild);
      }
      this.#addNodes(jsonPath.slice(1), value, keyChild);
    }
  }

  toDict(): { [x: string]: string } {
    const map = this.mm.window.document.getElementsByTagName("map")[0];
    let root: Element | null = null;
    for (const child of map.children) {
      if (child.tagName == "node") {
        root = child;
        break;
      }
    }
    if (root == null) {
      throw new Error("root node not found");
    }
    return this.#readNodes(root, "", "");
  }

  import(data: { [k: string]: string }) {
    const root = this.mm.window.document.getElementsByTagName("node")[0];
    for (const k in data) {
      this.#addNodes(k.split("/"), data[k], root);
    }
  }

  serialize(): string {
    return this.mm.serialize();
  }
}
