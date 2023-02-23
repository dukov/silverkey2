import * as fs from "fs";
import { EventEmitter } from "events";

enum UpdateSource {
  github = "github",
}

/* eslint-disable */
const deepLoad = (setting: ISetting, cfg: any) => {
  if (cfg == undefined) return;
  if (setting.value && cfg[setting.name]) {
    setting.value = cfg[setting.name];
  } else {
    for (const name of setting.getChildrenNames()) {
      if (cfg[name]) deepLoad(setting.getChild(name), cfg[name]);
    }
  }
};
const deepDump = (setting: ISetting, cfg: any) => {
  if (setting.getChildrenNames().length == 0) {
    cfg[setting.name] = setting.value;
  } else {
    cfg[setting.name] = {};
    for (const name of setting.getChildrenNames()) {
      deepDump(setting.getChild(name), cfg[setting.name]);
    }
  }
};
/* eslint-enable */

type SettingValueType = string | boolean | number | undefined;

interface ISetting extends EventEmitter {
  name: string;
  visible: boolean;
  eventName?: string;
  value: SettingValueType;
  getChildrenNames(): string[];
  getChild(name: string, def?: ISetting): ISetting;
  addChild(ch: ISetting): void;
}

type SettingParams = {
  visible: boolean;
  eventName?: string;
};

class Setting extends EventEmitter implements ISetting {
  name: string;
  visible: boolean;
  eventName?: string;
  private _children: { [key: string]: ISetting } = {};
  private _val: SettingValueType;
  constructor(name: string, value: SettingValueType, params?: SettingParams) {
    super();
    let actualParams: SettingParams = { visible: true };
    if (params) actualParams = params;
    this.name = name;
    this.visible = actualParams.visible;
    this._val = value;
    this.eventName = actualParams.eventName;
  }
  get value(): SettingValueType {
    return this._val;
  }
  set value(newVal: SettingValueType) {
    this._val = newVal;
    if (this.eventName) this.emit(this.eventName, newVal);
  }

  addChild(ch: ISetting) {
    if (ch.eventName && ch.eventName != "") {
      ch.on(ch.eventName, (...args) => {
        // eslint-disable-next-line
        this.emit(ch.eventName as string, ...args);
      });
    }
    this._children[ch.name] = ch;
  }
  getChild(name: string, def?: ISetting): ISetting {
    if (this._children[name]) return this._children[name];
    if (def) return def;
    throw new Error(`Option key ${name} does not exists for setting`);
  }
  getChildrenNames(): string[] {
    return Object.keys(this._children);
  }
}

const getConfig = (): Setting => {
  const updateCfg = new Setting("updateSourceConfig", false);
  updateCfg.addChild(new Setting("updateSource", UpdateSource.github));
  updateCfg.addChild(new Setting("user", "dukov"));
  updateCfg.addChild(new Setting("repo", "silverkey2"));
  updateCfg.addChild(new Setting("password", ""));

  const checkUpdates = new Setting("checkUpdates", false, {
    visible: true,
    eventName: "cfg.checkUpdates",
  });
  checkUpdates.on("cfg.checkUpdates", (val: boolean) => {
    updateCfg.visible = val;
  });

  const res = new Setting("cfg", undefined);
  res.addChild(new Setting("freePlanePath", ""));
  res.addChild(checkUpdates);
  res.addChild(updateCfg);
  return res;
};

export class SettingsHandler {
  settings: Setting;
  path: string;
  constructor(path: string) {
    this.path = path;
    this.settings = getConfig();
  }

  private _load(path: string): Setting {
    const defaults = getConfig();
    let cfg = {};
    try {
      const content = fs.readFileSync(path, { encoding: "utf-8" });
      cfg = JSON.parse(content) as typeof cfg;
    } catch (err) {
      console.log("Did not load settings from file. Use default");
    }
    deepLoad(defaults, cfg);
    return defaults;
  }

  save() {
    const dump = {};
    deepDump(this.settings, dump);
    const content = JSON.stringify(dump);
    fs.writeFileSync(this.path, content);
  }

  reload() {
    this.settings = this._load(this.path);
  }
}
