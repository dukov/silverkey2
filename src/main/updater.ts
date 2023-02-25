import { app } from "electron";
import { dirname, join } from "path";
import { Setting, SettingsHandler } from "./lib/settings";
import {
  CONFIG_MESSAGE,
  INSTALL_MESSAGE,
  Message,
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

class UpdaterProc {
  private watcher: UpdateWatcher | null = null;
  constructor() {
    process.parentPort.on("message", (msgEvt) => {
      this.processMsg(msgEvt.data as Message);
    });
  }
  private processMsg(msg: Message) {
    if (msg.type == CONFIG_MESSAGE) {
      if (this.watcher != null) this.watcher.stop();

      const userData = app.getPath("userData");
      this.watcher = createUpdateWatcher(
        msg.args[0],
        join(userData, "updates")
      );
      this.watcher.run();
    }
  }
}

const sendInstall = (path: string) => {
  const msg: Message = { type: INSTALL_MESSAGE, args: [] };
  process.parentPort.postMessage(msg);
};

const createUpdateWatcher = (
  settings: Setting,
  savePath: string
): UpdateWatcher => {
  const owner = settings.getChild("user").value;
  const repo = settings.getChild("repo").value;
  const token = settings.getChild("password").value;

  return new UpdateWatcher({
    artifactName: ARTEFACT_MAP[process.platform],
    currentVersion: VERSION,
    checkInterval: CHECK_INTERVAL,
    savePath: savePath,
    owner: owner as string,
    repo: repo as string,
    token: token as string,
    installCallBack: sendInstall,
  });
};
