// main.js

// Modules to control application life and create native browser window
import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  nativeImage,
  Menu,
  globalShortcut,
  NativeImage,
} from "electron";

import { join } from "path";

import { FreePlaneRunner } from "./lib/freeplane";
import { KVDBClient } from "./lib/kvdb/kvdb";
import { DB_FILE_NAME } from "./lib/localdb/filedb";
import {
  CHECK_UPDATES_EVT,
  SettingData,
  SettingsHandler,
  UPDATE_SRC_CONFIG_EVT,
} from "./lib/settings";
import { Updater } from "./lib/updater/process";

declare const IS_PROD: boolean;

const assetsDirectory = app.isPackaged
  ? join(process.resourcesPath, "assets")
  : join(__dirname, "../../assets");
console.log("Assets", assetsDirectory);
const rendererDir = join(__dirname, "../renderer");

if (process.platform == "darwin") app.dock.hide();

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  void mainWindow.loadFile(join(rendererDir, "index.html"));

  /*
  IS_PROD isPackaged DEBUG showDT
    0       0         0     1
    0       0         1     1
    0       1         1     1
    1       0         1     1
    1       1         1     1

    0       1         0     0
    1       0         0     0
    1       1         0     0
  */
  let showDT = true;
  // TODO Simplify logic expression
  if (
    (!IS_PROD && app.isPackaged && process.env.DEBUG != "true") ||
    (IS_PROD && !app.isPackaged && process.env.DEBUG != "true") ||
    (IS_PROD && app.isPackaged && process.env.DEBUG != "true")
  ) {
    showDT = false;
  }

  // Open the DevTools.
  if (showDT) mainWindow.webContents.openDevTools();
  return mainWindow;
};

const createTray = async () => {
  const icon_path = join(assetsDirectory, "sk_logo.png");
  let icon: string | NativeImage = icon_path;
  if (process.platform !== "linux") {
    icon = await nativeImage.createThumbnailFromPath(icon_path, {
      width: 30,
      height: 30,
    });
  }

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Settings",
      type: "normal",
      click: () => {
        let win = null;
        if (!mainWindow) {
          win = createWindow();
        } else {
          win = mainWindow;
        }
        win.webContents.send("show-settings");
      },
    },
    {
      label: "Quit",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
void app
  .whenReady()
  .then(() => {
    globalShortcut.register("Alt+CommandOrControl+I", () => {
      if (!mainWindow) {
        createWindow();
      } else {
        app.focus({ steal: true });
      }
    });
  })
  .then(() => {
    createWindow();
    void createTray();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform == "darwin") app.hide();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const userData = app.getPath("userData");
console.log("User data dir", userData);
const db = new KVDBClient();
const settings = new SettingsHandler(join(userData, "skSettings.json"));

const dbConf = settings.settings.getChild("kvDatabases");
for (const dbName of dbConf.getChildrenNames()) {
  const url = dbConf.getChild(dbName).getChild("url").value as string;
  db.addDB(dbName, "localfile", url);
}
db.selectedDB = dbConf.getChildrenNames()[0];

const updater: Updater = new Updater(
  join(__dirname, "updater.js"),
  settings.settings
);
settings.settings.on(CHECK_UPDATES_EVT, (val: boolean) => {
  if (val) {
    updater.start();
  } else {
    updater.stop();
  }
});
settings.settings.on(UPDATE_SRC_CONFIG_EVT, () => {
  updater.restart();
});
settings.reload();
console.log("Settings loaded");

const freeplane: FreePlaneRunner = new FreePlaneRunner(
  join(userData, DB_FILE_NAME),
  () => {
    if (!mainWindow) createWindow();
  }
);
if (
  freeplane.path == null &&
  settings.settings.getChild("freePlanePath").value != ""
) {
  freeplane.path = settings.settings.getChild("freePlanePath").value as string;
}

ipcMain.handle("get-keys", () => {
  return db.getKeys();
});

ipcMain.handle("get-val", (_, key: string) => {
  return db.getValue(key);
});

ipcMain.handle("set-val", (_, key: string, value: string) => {
  return db.setValue(key, value);
});

ipcMain.handle("delete-key", (_, key: string) => {
  return db.deleteKey(key);
});

ipcMain.handle("app-hide", () => {
  if (process.platform == "darwin") {
    app.hide();
  } else {
    if (mainWindow) {
      mainWindow.close();
    }
  }
});

ipcMain.handle("get-settings", () => {
  return settings.settings.toData();
});

ipcMain.handle("save-settings", (_, newSettings: SettingData) => {
  settings.settings.fromData(newSettings);
  settings.save();
  console.log("Settings saved");
});

ipcMain.handle("get-fp-path", () => {
  return freeplane.path;
});

ipcMain.handle("run-freeplane", (_, path: string) => {
  freeplane.path = path;
  freeplane.run();
});

ipcMain.handle("get-kvdbs", () => {
  return db.getDBNames();
});

ipcMain.handle("get-selected-db", () => {
  return db.selectedDB;
});

ipcMain.handle("select-db", (_, dbName: string) => {
  db.selectedDB = dbName;
});
