import * as fs from "fs";

enum UpdateSource {
  github = "github",
}

export interface SingleSetting<T> {
  value: T;
  description: string;
}

class SingleSettingImpl<T> {
  _value: T;
  _description: string;
  constructor(val: T, desc: string) {
    this._value = val;
    this._description = desc;
  }
}

interface UpdateSourceConfig {
  updateSource: SingleSetting<UpdateSource>;
  user: SingleSetting<string>;
  repo: SingleSetting<string>;
  password: SingleSetting<string>;
}

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
    deepMerge(this.settings, fromFile);
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
