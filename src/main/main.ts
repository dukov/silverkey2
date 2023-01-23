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

import { FileDB } from "./lib/localdb/filedb";

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
    transparent: app.isPackaged,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  void mainWindow.loadFile(join(rendererDir, "index.html"));

  // Open the DevTools.
  if (!app.isPackaged) mainWindow.webContents.openDevTools();
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
const db = new FileDB(join(userData, "kvdb.json"));

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
