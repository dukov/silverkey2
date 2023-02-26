import { SettingData } from "main/lib/settings";
import React, { ChangeEvent } from "react";

import "./Settings.css";

// eslint-disable-next-line
type T = any;

type SettingsState = {
  settings: SettingData;
};

class SettingsMain extends React.Component<{}, SettingsState> {
  state = {
    settings: {
      name: "cfg",
      visible: true,
      value: undefined,
      description: "Silverkey2 Settings",
      help: "",
      children: {} as { [k: string]: SettingData },
    } as SettingData,
  };
  async componentDidMount(): Promise<void> {
    const settings = await window.eRPC.getSettings();
    this.setState({ settings: settings });
  }

  createSingleSetting(settingName: string, setting: SettingData): JSX.Element {
    if (setting.value == undefined) {
      const subList: JSX.Element[] = [];
      for (const childName in setting.children) {
        const child = setting.children[childName];
        subList.push(
          this.createSingleSetting(`${settingName} ${childName}`, child)
        );
      }
      return (
        <div className="settings-group" key={settingName}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-group-content">{subList}</div>
        </div>
      );
    } else if (typeof setting.value == "boolean") {
      return (
        <div className="single-setting" key={settingName}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              data-key={settingName}
              checked={setting.value}
              onChange={this.onInputChange}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="single-setting" key={settingName}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-text">
            <input
              type="text"
              data-key={settingName}
              value={setting.value as string}
              onChange={this.onInputChange}
            />
          </div>
        </div>
      );
    }
  }
  /* eslint-disable */
  onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const keypath = (evt.target.dataset["key"] as string).split(" ");
    keypath.shift();
    console.log("Key path", keypath);
    let origSettings = structuredClone(this.state.settings);
    let settings = origSettings;
    for (const key of keypath) {
      console.log("Dump set", settings, key);
      if (settings == undefined || settings.value != undefined) {
        console.error(
          `Error finding setting by path ${keypath}. Setting ${settings.name} has defined value`
        );
        return;
      }
      settings = settings.children[key];
    }
    if (evt.target.type == "checkbox") {
      settings.value = evt.target.checked;
    } else {
      settings.value = evt.target.value;
    }

    this.setState({ settings: origSettings });
  };
  /* eslint-enable */
  onSaveSettings = () => {
    void (async () => {
      await window.eRPC.saveSettings(this.state.settings);
    })();
    location.reload();
  };
  cancelSaveSettings = () => {
    location.reload();
  };
  render(): React.ReactNode {
    console.log("Start Rendering");
    const settings = this.createSingleSetting(
      this.state.settings.name,
      this.state.settings
    );
    const saveBtn = "\u2714\uFE0F";
    const cancelBtn = "\u274C";
    window.requestAnimationFrame(() => {
      window.resizeTo(800, document.body.offsetHeight + 40);
    });
    return (
      <div className="settingsMain">
        {settings}
        <div className="setting-buttons">
          <div className="save-button">
            <a href="#" onClick={this.onSaveSettings}>
              {saveBtn}
            </a>
          </div>
          <div className="cancel-button">
            <a href="#" onClick={this.cancelSaveSettings}>
              {cancelBtn}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsMain;
