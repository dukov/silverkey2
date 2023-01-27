import * as fs from "fs";

export enum UpdateSource {
  github,
}

export interface UpdateSourceConfig {
  updateSource: UpdateSource;
  user: string;
  repo: string;
  password?: string;
}

export interface Settings {
  checkUpdates: boolean;
  useNonReleasedVersions: boolean;
  updateSourceConfig: UpdateSourceConfig;
}
export class SettingsHandler {
  settings: Settings;
  path: string;
  constructor(path: string) {
    this.path = path;
    try {
      this.settings = this._load(this.path);
    } catch (err) {
      this.settings = {
        checkUpdates: false,
        useNonReleasedVersions: false,
        updateSourceConfig: {
          updateSource: UpdateSource.github,
          user: "dukov",
          repo: "silverkey2",
        },
      };
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
