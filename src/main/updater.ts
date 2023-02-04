import { dirname, join } from "path";
import { SettingsHandler } from "./lib/settings";
import {
  ConfigFileMessage,
  CONFIG_MESSAGE,
  GenericMessage,
  InstallUpdateMessage,
  RELOAD_CFG_MESSAGE,
} from "./lib/updater/interface";
import { UpdateWatcher } from "./lib/updater/watcher";

declare const VERSION: string;

const CHECK_INTERVAL = 3600000;

const ARTEFACT_MAP: { [key: string]: string } = {
  linux: "silverkey2-ubuntu-latest",
  darwin: "silverkey2-macos-latest",
  win32: "silverkey2-windows-latest",
};

let configFile = "";

process.parentPort.on("message", (e) => {
  const data = e.data as GenericMessage;
  if (data.type == "") return;
  if (data.message == CONFIG_MESSAGE) {
    const msg = e.data as ConfigFileMessage;
    console.log("Got event with config file");

    configFile = msg.path;
    const savePath = join(dirname(configFile), "updates");
    settings.path = configFile;
    settings.reload();
    console.log("Settings loaded");

    if (settings.settings.checkUpdates) {
      const watcher = createUpdateWatcher(savePath);
      watcher.run();
    }
  } else if (data.message == RELOAD_CFG_MESSAGE) {
    console.log("Got reload config event");
    settings.reload();
  }
});

const settings = new SettingsHandler(configFile);

const sendInstall = (path: string) => {
  const msg = new InstallUpdateMessage(path);
  process.parentPort.postMessage(msg);
};

const createUpdateWatcher = (savePath: string): UpdateWatcher => {
  let owner = "";
  let repo = "";
  let token = "";
  if (settings.settings.updateSourceConfig != null) {
    owner = settings.settings.updateSourceConfig.value.user.value;
    repo = settings.settings.updateSourceConfig.value.repo.value;
    if (settings.settings.updateSourceConfig.value.password != null) {
      token = settings.settings.updateSourceConfig.value.password.value;
    }
  }

  return new UpdateWatcher({
    artifactName: ARTEFACT_MAP[process.platform],
    currentVersion: VERSION,
    checkInterval: CHECK_INTERVAL,
    savePath: savePath,
    owner: owner,
    repo: repo,
    token: token,
    installCallBack: sendInstall,
  });
};
