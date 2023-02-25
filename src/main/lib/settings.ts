import * as fs from "fs";
import { EventEmitter } from "events";

export const UPDATE_SRC_CONFIG_EVT = "cfg.updateSourceConfig";
export const CHECK_UPDATES_EVT = "cfg.checkUpdates";

enum UpdateSource {
  github = "github",
}

/* eslint-disable */
const deepLoad = (setting: Setting, cfg: any) => {
  if (cfg == undefined) return;
  if (setting.value != undefined && cfg[setting.name] != undefined) {
    setting.value = cfg[setting.name];
  } else {
    for (const name of setting.getChildrenNames()) {
      if (cfg[name]) deepLoad(setting.getChild(name), cfg[name]);
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

export class Setting extends EventEmitter {
  name: string;
  visible: boolean;
  eventName?: string;
  private _children: { [key: string]: Setting } = {};
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
  const updateCfg = new Setting("updateSourceConfig", false);
  updateCfg.addChild(
    new Setting("updateSource", UpdateSource.github, {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("user", "dukov", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("repo", "silverkey2", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );
  updateCfg.addChild(
    new Setting("password", "", {
      visible: true,
      eventName: UPDATE_SRC_CONFIG_EVT,
    })
  );

  const checkUpdates = new Setting("checkUpdates", false, {
    visible: true,
    eventName: CHECK_UPDATES_EVT,
  });
  checkUpdates.on(CHECK_UPDATES_EVT, (val: boolean) => {
    updateCfg.visible = val;
  });

  const res = new Setting("cfg", undefined);
  res.addChild(new Setting("freePlanePath", ""));
  res.addChild(checkUpdates);
  res.addChild(updateCfg);
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
