import { SettingData } from "main/lib/settings";
import React, { ChangeEvent, MouseEvent } from "react";

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

  createSingleSetting(
    settingName: string,
    setting: SettingData,
    dynamic: boolean
  ): JSX.Element {
    if (setting.value == undefined) {
      const subList: JSX.Element[] = [];
      for (const childName in setting.children) {
        const child = setting.children[childName];
        subList.push(
          this.createSingleSetting(
            `${settingName} ${childName}`,
            child,
            setting.dynamic
          )
        );
      }
      let removeBtn: JSX.Element | undefined = undefined;
      if (dynamic) {
        const removeLnk = "\u2796";
        removeBtn = (
          <div className="remove-setting">
            <a
              href="#"
              data-key={settingName}
              onClick={this.onRemoveSettingClick}
            >
              {removeLnk}
            </a>
          </div>
        );
      }
      let addButton: JSX.Element | undefined = undefined;
      if (setting.dynamic) {
        const addLnk = "\u2795";
        addButton = (
          <div className="add-setting">
            <a href="#" data-key={settingName} onClick={this.onAddSettingClick}>
              {addLnk}
            </a>
          </div>
        );
      }
      return (
        <div
          className={`settings-group${setting.visible ? "" : "-hidden"}`}
          key={settingName}
        >
          <div className="settings-group-header">
            <div className="settings-desc">{setting.description}</div>
            {addButton}
          </div>
          <div className="settings-group-content">{subList}</div>
          {removeBtn}
        </div>
      );
    } else if (typeof setting.value == "boolean") {
      return (
        <div
          className={`single-setting${setting.visible ? "" : "-hidden"}`}
          key={settingName}
        >
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
        <div
          className={`single-setting${setting.visible ? "" : "-hidden"}`}
          key={settingName}
        >
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
    let origSettings = structuredClone(this.state.settings);
    let settings = origSettings;
    let parent: SettingData | undefined = undefined;
    let dynamicSetting: SettingData | undefined = undefined;
    for (const key of keypath) {
      if (settings == undefined || settings.value != undefined) {
        console.error(
          `Error finding setting by path ${keypath}. Setting ${settings.name} has defined value`
        );
        return;
      }
      if (settings.dynamic) {
        dynamicSetting = settings;
      }
      parent = settings;
      settings = settings.children[key];
    }
    if (evt.target.type == "checkbox") {
      settings.value = evt.target.checked;
    } else {
      settings.value = evt.target.value;
      if (dynamicSetting != undefined && settings.name == "name") {
        if (parent != undefined) {
          delete dynamicSetting.children[parent.name];
          parent.name = settings.value;
          parent.description = settings.value;
          dynamicSetting.children[parent.name] = parent;
        }
      }
    }
    console.log(evt.target.dataset["key"] as string);
    this.setState({ settings: origSettings });
  };
  /* eslint-enable */

  onRemoveSettingClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    const keypath = (
      evt.currentTarget.getAttribute("data-key") as string
    ).split(" ");

    keypath.shift();
    const settingName = keypath.pop();
    if (settingName == undefined) {
      console.error("Key path can not be empty");
      return;
    }
    let origSettings = structuredClone(this.state.settings);
    let settings = origSettings;
    for (const key of keypath) {
      if (settings == undefined || settings.value != undefined) {
        console.error(
          `Error finding setting by path ${keypath}. Setting ${settings.name} has defined value`
        );
        return;
      }
      settings = settings.children[key];
    }
    delete settings.children[settingName];
    this.setState({ settings: origSettings });
  };

  onAddSettingClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    const keypath = (
      evt.currentTarget.getAttribute("data-key") as string
    ).split(" ");

    keypath.shift();
    let origSettings = structuredClone(this.state.settings);
    let settings = origSettings;
    for (const key of keypath) {
      if (settings == undefined || settings.value != undefined) {
        console.error(
          `Error finding setting by path ${keypath}. Setting ${settings.name} has defined value`
        );
        return;
      }
      settings = settings.children[key];
    }

    settings.children["new_database"] = {
      name: "new_database",
      visible: true,
      description: "new_database",
      help: "",
      value: undefined,
      children: {
        name: {
          name: "name",
          visible: true,
          description: "Name",
          help: "",
          value: "new_database",
          children: {},
          dynamic: false,
        },
        url: {
          name: "url",
          visible: true,
          description: "URL",
          help: "",
          value: "",
          children: {},
          dynamic: false,
        },
      },
      dynamic: false,
    };

    this.setState({ settings: origSettings });
  };

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
    const settings = this.createSingleSetting(
      this.state.settings.name,
      this.state.settings,
      false
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
