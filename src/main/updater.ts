import { dirname, join } from "path";
import { SettingsHandler } from "./lib/settings";
import { UpdateWatcher } from "./lib/updater/watcher";

const ARTEFACT_MAP: { [key: string]: string } = {
  linux: "silverkey2-ubuntu-latest",
  darwin: "silverkey2-macos-latest",
  win32: "silverkey2-windows-latest",
};

let configFile = "";

process.parentPort.on("message", async (e) => {
  if (e.data.message == "config-file") {
    console.log("Got event with config file");

    configFile = e.data.path;
    let savePath = join(dirname(configFile), "updates");
    settings.path = configFile;
    settings.reload();
    console.log("Settings loaded");

    if (settings.settings.checkUpdates) {
      let watcher = createUpdateWatcher(savePath);
      watcher.run();
    }
  } else if (e.data.message == "reload-config") {
    console.log("Got reload config event");
    settings.reload();
  }
});

const settings = new SettingsHandler(configFile);

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
    currentVersion: "",
    checkInterval: 10000,
    savePath: savePath,
    owner: owner,
    repo: repo,
    token: token,
  });
};
