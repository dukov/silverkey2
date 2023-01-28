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
  password?: SingleSetting<string>;
}

export interface Settings {
  checkUpdates: SingleSetting<boolean>;
  useNonReleasedVersions: SingleSetting<boolean>;
  updateSourceConfig?: SingleSetting<UpdateSourceConfig>;
}

const DEFAULT_SETTINGS: Settings = {
  checkUpdates: {
    value: false,
    description: "Enable automatic updates",
  },
  useNonReleasedVersions: {
    value: false,
    description: "Use artifacts from main brunch",
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
    },
  },
};

export class SettingsHandler {
  settings: Settings;
  path: string;
  constructor(path: string) {
    this.path = path;
    try {
      this.settings = this._load(this.path);
    } catch (err) {
      this.settings = DEFAULT_SETTINGS;
    }
  }
  private _load(path: string): Settings {
    const content = fs.readFileSync(path, { encoding: "utf-8" });
    const settingsRaw = JSON.parse(content);
    return settingsRaw as Settings;
  }
  save() {
    const content = JSON.stringify(this.settings);
    fs.writeFileSync(this.path, content);
  }
  reload() {
    this.settings = this._load(this.path);
  }
}
