import * as fs from "fs";

enum UpdateSource {
  github = "github",
}

export interface SingleSetting<T> {
  value: T;
  description: string;
}

interface UpdateSourceConfig {
  updateSource: SingleSetting<UpdateSource>;
  user: SingleSetting<string>;
  repo: SingleSetting<string>;
  password: SingleSetting<string>;
}

/* eslint-disable */
const isDict = (v: any) => {
  return v && typeof v == "object" && !Array.isArray(v);
};

const deepMerge = (target: any, source: any) => {
  for (const k in source) {
    if ((target[k] && !isDict(target[k])) || !target[k] || !isDict(source[k])) {
      target[k] = source[k];
    } else {
      deepMerge(target[k], source[k]);
    }
  }
};

const deepUpdate = (target: any, source: any) => {
  for (const k in target) {
    if (typeof target[k] == typeof source[k]) {
      if (isDict(target[k])) {
        deepUpdate(target[k], source[k]);
      } else {
        target[k] = source[k];
      }
    }
  }
};
/* eslint-enable */

export interface Settings {
  freePlanePath: SingleSetting<string>;
  checkUpdates: SingleSetting<boolean>;
  updateSourceConfig: SingleSetting<UpdateSourceConfig>;
}

const DEFAULT_SETTINGS: Settings = {
  freePlanePath: {
    value: "",
    description: "Path to Freeplane binary",
  },
  checkUpdates: {
    value: false,
    description: "Enable automatic updates",
  },
  updateSourceConfig: {
    description: "Artifact Source",
    value: {
      updateSource: {
        value: UpdateSource.github,
        description: "Type",
      },
      user: {
        value: "dukov",
        description: "User",
      },
      repo: {
        value: "silverkey2",
        description: "Repository",
      },
      password: {
        value: "",
        description: "Password or Token",
      },
    },
  },
};

export class SettingsHandler {
  settings: Settings;
  path: string;
  constructor(path: string) {
    this.path = path;
    this.settings = DEFAULT_SETTINGS;
    let fromFile = {};
    try {
      fromFile = this._load(this.path);
    } catch (err) {
      console.log("Did not load settings from file. Use default");
    }
    deepUpdate(this.settings, fromFile);
  }
  private _load(path: string): Settings {
    const content = fs.readFileSync(path, { encoding: "utf-8" });
    return JSON.parse(content) as Settings;
  }
  save() {
    const content = JSON.stringify(this.settings);
    fs.writeFileSync(this.path, content);
  }
  reload() {
    this.settings = this._load(this.path);
  }
}
