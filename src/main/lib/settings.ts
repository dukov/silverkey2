import * as fs from "fs";
import { EventEmitter } from "events";
import { join } from "path";
import { app } from "electron";
import { cloneDeep } from "lodash";

import { DB_FILE_NAME } from "./localdb/filedb";

export const UPDATE_SRC_CONFIG_EVT = "cfg.updateSourceConfig";
export const CHECK_UPDATES_EVT = "cfg.checkUpdates";

declare const IS_PROD: boolean;

enum UpdateSource {
  github = "github",
}

/* eslint-disable */
const deepLoad = (setting: Setting, cfg: any) => {
  if (cfg == undefined) return;
  if (setting.value != undefined && cfg != undefined) {
    setting.value = cfg;
  } else {
    for (const name of setting.getChildrenNames()) {
      if (name in cfg) {
        let child = setting.getChild(name);
        if (child.dynamic) {
          let dynamicSample = child.getChild(child.getChildrenNames()[0]);
          for (const cfgChild in cfg[name]) {
            let newS = cloneDeep(dynamicSample);
            newS.name = cfgChild;
            deepLoad(newS, cfg[name][cfgChild]);
            child.addChild(newS);
          }
        } else {
          deepLoad(child, cfg[name]);
        }
      }
    }
  }
};
const deepDump = (setting: Setting, cfg: any) => {
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

type SettingParams = {
  visible: boolean;
  eventName?: string;
};

export interface SettingData {
  name: string;
  visible: boolean;
  description: string;
  help: string;
  value: SettingValueType;
  children: { [key: string]: SettingData };
  dynamic: boolean;
}

export class Setting extends EventEmitter {
  name: string;
  visible: boolean;
  description: string;
  help = "";
  eventName?: string;
  dynamic = false;
  private _children: { [key: string]: Setting } = {};
  private _val: SettingValueType;
  constructor(
    name: string,
    value: SettingValueType,
    description: string,
    params?: SettingParams
  ) {
    super();
    let actualParams: SettingParams = { visible: true };
    if (params) actualParams = params;
    this.name = name;
    this.description = description;
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

  toData(): SettingData {
    const res: SettingData = {
      name: this.name,
      visible: this.visible,
      description: this.description,
      help: this.help,
      value: this.value,
      children: {},
      dynamic: this.dynamic,
    };
    if (this.value == undefined) {
      for (const childName of this.getChildrenNames()) {
        res.children[childName] = this.getChild(childName).toData();
      }
    }
    return res;
  }

  fromData(data: SettingData) {
    if (this.value == undefined) {
      this.dynamic = data.dynamic;
      this._children = {};
      for (const childName in data.children) {
        const child = data.children[childName];
        const newS = new Setting(child.name, child.value, child.description);
        newS.fromData(child);
        this.addChild(newS);
      }
    } else {
      this.value = data.value;
    }
  }

  addChild(ch: Setting) {
    if (ch.eventName && ch.eventName != "") {
      ch.on(ch.eventName, (...args) => {
        // eslint-disable-next-line
        this.emit(ch.eventName as string, ...args);
      });
    }
    this._children[ch.name] = ch;
  }
  getChild(name: string, def?: Setting): Setting {
    if (this._children[name]) return this._children[name];
    if (def) return def;
    throw new Error(`Option key ${name} does not exists for setting`);
  }
  getChildrenNames(): string[] {
    return Object.keys(this._children);
  }

  update(newSetting: Setting) {
    if (this.value != undefined && newSetting.value != undefined) {
      this.value = newSetting.value;
    } else if (this._val == undefined && newSetting.value == undefined) {
      this.dynamic = newSetting.dynamic;
      for (const childName in this._children) {
        this._children[childName].update(newSetting.getChild(childName));
      }
    } else {
      throw new Error(
        `Failed to update setting ${this.name}. New setting has different type`
      );
    }
  }
}

export const getDefaultSettings = (): Setting => {
  // Config for Artifact source
  const updateCfg = new Setting(
    "updateSourceConfig",
    undefined,
    "Artifact Source",
    { visible: !IS_PROD }
  );
  updateCfg.addChild(
    new Setting("updateSource", UpdateSource.github, "Type", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("user", "dukov", "User", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("repo", "silverkey2", "Repository", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("password", "", "Password", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );

  // Config for Check updates
  const checkUpdates = new Setting("checkUpdates", false, "Check Updates", {
    visible: !IS_PROD,
    eventName: CHECK_UPDATES_EVT,
  });
  checkUpdates.on(CHECK_UPDATES_EVT, (val: boolean) => {
    updateCfg.visible = val;
  });

  // Config for key-value databases
  const defaultKVDB = new Setting("default", undefined, "default");
  defaultKVDB.addChild(new Setting("name", "default", "Name"));
  defaultKVDB.addChild(
    new Setting("url", join(app.getPath("userData"), DB_FILE_NAME), "URL")
  );

  const kvDatabases = new Setting(
    "kvDatabases",
    undefined,
    "Key-Value Databases"
  );
  kvDatabases.dynamic = true;
  kvDatabases.addChild(defaultKVDB);

  // Root config
  const res = new Setting("cfg", undefined, "Silverkey2 Settings");
  res.addChild(new Setting("freePlanePath", "", "Path to Freeplane binary"));
  res.addChild(checkUpdates);
  res.addChild(updateCfg);
  res.addChild(kvDatabases);
  return res;
};

export class SettingsHandler {
  _settings: Setting;
  path: string;
  constructor(path: string) {
    this.path = path;
    this._settings = this._load(this.path);
  }

  get settings(): Setting {
    return this._settings;
  }

  set settings(newSettings: Setting) {
    this._settings.update(newSettings);
  }

  private _load(path: string): Setting {
    const defaults = getDefaultSettings();
    // eslint-disable-next-line
    let cfg: { [k: string]: any } = {};
    try {
      const content = fs.readFileSync(path, { encoding: "utf-8" });
      cfg = JSON.parse(content) as typeof cfg;
    } catch (err) {
      console.log("Did not load settings from file. Use default");
    }
    deepLoad(defaults, cfg[defaults.name]);
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
