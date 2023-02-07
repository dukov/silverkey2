import fs from "fs";
import { join } from "path";
import { FREEPLANE_BASE } from "./constants";
import jsdom from "jsdom";

const DB_FILE_NAME = "kvdb.mm";

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
    if (!fs.lstatSync(path).isDirectory()) {
      throw new Error(
        `Failed to load key-value DB. ${path} is not a directory`
      );
    }
    this.path = join(path, DB_FILE_NAME);
    this.contents = {};
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.log(
          `File ${this.path} does not exists initializing with empty DB`
        );
      } else {
        try {
          // eslint-disable-next-line
          this.contents = JSON.parse(data.toString("utf-8"));
          fs.copyFileSync(this.path, `${this.path}.backup`);
        } catch (e) {
          if (e instanceof SyntaxError) {
            this.contents = new MindMap(data.toString("utf-8")).toDict();
          } else {
            throw e;
          }
        }
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
