import { SingleSetting, Settings } from "main/lib/settings";
import React, { ChangeEvent } from "react";

import "./Settings.css";

type T = any;

type SettingsState = {
  settings: Settings | null;
};

type SettingsProps = {};

class SettingsMain extends React.Component<SettingsProps, SettingsState> {
  state = {
    settings: null,
  };
  async componentDidMount(): Promise<void> {
    if (this.state.settings == null) {
      const settings = await window.eRPC.getSettings();
      this.setState({ settings: settings });
    }
  }

  createSingleSetting(key: string, setting: SingleSetting<T>): JSX.Element {
    if (typeof setting.value == "object") {
      let subList: JSX.Element[] = [];
      for (const [k, v] of Object.entries(setting.value)) {
        subList.push(
          this.createSingleSetting(`${key} ${k}`, v as SingleSetting<T>)
        );
      }
      return (
        <div className="settings-group" key={key}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-group-content">{subList}</div>
        </div>
      );
    } else if (typeof setting.value == "boolean") {
      return (
        <div className="single-setting" key={key}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              data-key={key}
              checked={setting.value}
              onChange={this.onInputChange}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="single-setting" key={key}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-text">
            <input
              type="text"
              data-key={key}
              value={setting.value}
              onChange={this.onInputChange}
            />
          </div>
        </div>
      );
    }
  }

  renderSettings(): JSX.Element[] {
    let res: JSX.Element[] = [];
    if (this.state.settings == null) {
      return res;
    }
    for (const [k, v] of Object.entries(this.state.settings)) {
      res.push(this.createSingleSetting(k, v as SingleSetting<T>));
    }
    return res;
  }

  onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (this.state.settings == null) {
      return;
    }
    const keypath = (evt.target.dataset["key"] as string).split(" ");
    let origSettings = structuredClone(this.state.settings) as any;
    let settings = origSettings;
    for (const key of keypath) {
      settings = settings[key];
      if (settings == undefined) {
        return;
      }
      if (typeof settings.value != "object") {
        break;
      }
      settings = settings.value;
    }
    if (evt.target.type == "checkbox") {
      settings.value = evt.target.checked;
    } else {
      settings.value = evt.target.value;
    }

    this.setState({ settings: origSettings });
  };
  render(): React.ReactNode {
    console.log("Start Rendering");
    let settings: JSX.Element[] = [];
    settings = this.renderSettings();
    const saveBtn = "\u2714\uFE0F";
    const cancelBtn = "\u274C";
    return (
      <div className="settingsMain">
        {settings}
        <div className="setting-buttons">
          <div className="save-button">
            <a href="#">{saveBtn}</a>
          </div>
          <div className="cancel-button">
            <a href="#">{cancelBtn}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsMain;
