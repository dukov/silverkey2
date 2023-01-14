const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("eAPI", {
  getKeys: () => ipcRenderer.invoke("get-keys"),
  getValue: (key) => ipcRenderer.invoke("get-val", key),
  setValue: (key, value) => ipcRenderer.invoke("set-val", key, value),
  appHide: () => ipcRenderer.invoke("app-hide"),
});
