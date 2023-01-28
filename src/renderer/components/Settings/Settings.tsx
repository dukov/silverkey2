import { SingleSetting, Settings } from "main/lib/settings";
import React from "react";

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
    const settings = await window.eRPC.getSettings();
    this.setState({ settings: settings });
  }

  createSingleSetting(key: string, setting: SingleSetting<T>): JSX.Element {
    if (typeof setting.value == "object") {
      let subList: JSX.Element[] = [];
      for (const [k, v] of Object.entries(setting.value)) {
        subList.push(this.createSingleSetting(k, v as SingleSetting<T>));
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
            <input type="checkbox" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="single-setting" key={key}>
          <div className="settings-desc">{setting.description}</div>
          <div className="settings-text">
            <input type="text" />
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
      console.log("renderSettings, res", res);
    }
    return res;
  }
  render(): React.ReactNode {
    console.log("Start Rendering");
    let settings: JSX.Element[] = [];
    settings = this.renderSettings();
    console.log("Rendered settings", settings);
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
