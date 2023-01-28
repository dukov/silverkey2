import { SingleSetting, Settings } from "main/lib/settings";
import React from "react";

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
          {setting.description}
          {subList}
        </div>
      );
    } else if (typeof setting.value == "boolean") {
      return (
        <div className="single-setting" key={key}>
          {setting.description} <input type="checkbox" />
        </div>
      );
    } else {
      return (
        <div className="single-setting" key={key}>
          {setting.description} <input type="text" />
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
    return (
      <div className="settingsMain">
        {settings}
        <div className="setting-buttons">
          <div className="save-button">
            <a href="#">Save</a>
          </div>
          <div className="cancel-button">
            <a href="#">Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsMain;
