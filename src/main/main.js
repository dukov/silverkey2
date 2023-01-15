// main.js

// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  nativeImage,
  Menu,
  globalShortcut,
} = require("electron");
const path = require("path");

const { FileDB } = require("./lib/localdb/filedb");

const assetsDirectory = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../assets");
console.log("Assets", assetsDirectory);
const rendererDir = path.join(__dirname, "../renderer");

if (process.platform == "darwin") app.dock.hide();

let tray = undefined;
let mainWindow = undefined;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: app.isPackaged,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(rendererDir, "index.html"));

  // Open the DevTools.
  if (!app.isPackaged) mainWindow.webContents.openDevTools();
};

const createTray = async () => {
  const icon_path = path.join(assetsDirectory, "sk_logo.png");
  let icon = icon_path;
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
app
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
    createTray();

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
  mainWindow = undefined;
  if (process.platform == "darwin") app.hide();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const userData = app.getPath("userData");
console.log("User data dir", userData);
const db = new FileDB(path.join(userData, "kvdb.json"));

ipcMain.handle("get-keys", async (evt, data) => {
  return db.getKeys();
});

ipcMain.handle("get-val", async (evt, key) => {
  return db.getValue(key);
});

ipcMain.handle("set-val", async (evt, key, value) => {
  return db.setValue(key, value);
});

ipcMain.handle("delete-key", async (evt, key) => {
  return db.deleteKey(key);
});

ipcMain.handle("app-hide", async (evt) => {
  if (process.platform == "darwin") {
    app.hide();
  } else {
    mainWindow.close();
  }
});
