import { app, utilityProcess, UtilityProcess } from "electron";
import { getDefaultSettings, Setting } from "../settings";
import { installPackage } from "./installer";
import { CONFIG_MESSAGE, INSTALL_MESSAGE, Message } from "./interface";
import { getLogger } from "../logging/logger";

const log = getLogger();

export class Updater {
  private _proc: UtilityProcess | null = null;
  private path: string;
  // eslint-disable-next-line
  private msgTypeMap: { [k: string]: (...arg: any[]) => void } = {};
  private _settings: Setting = getDefaultSettings();
  constructor(path: string, settings: Setting) {
    this.path = path;
    this.msgTypeMap[INSTALL_MESSAGE] = this.install;
    this._settings = settings;
    if (this._settings.getChild("checkUpdates").value) {
      this.start();
    }
  }
  start() {
    if (this._proc == null) {
      this._proc = utilityProcess.fork(this.path);
      this.addListeners();
    }
  }

  private addListeners() {
    if (this._proc == null) return;

    this._proc.on("spawn", () => {
      const cfg = this._settings.getChild("updateSourceConfig").toData();
      const msg: Message = {
        type: CONFIG_MESSAGE,
        args: [cfg, app.getPath("userData")],
      };
      log.debug("Proc", this._proc?.pid);
      if (this._proc) this._proc.postMessage(msg);
      log.info("Updater started");
    });

    this._proc.on("exit", () => {
      log.info("Updater stopped");
    });

    this._proc.on("message", (msg) => {
      const updMsg = msg as Message;

      const func = this.msgTypeMap[updMsg.type];
      if (func != undefined) {
        // eslint-disable-next-line
        func(...updMsg.args);
      }
    });
  }

  private install = (path: string) => {
    installPackage(path);
    app.quit();
  };

  stop() {
    if (this._proc != null) {
      this._proc.kill();
      this._proc = null;
    }
  }
  restart() {
    this.stop();
    this.start();
  }
}
