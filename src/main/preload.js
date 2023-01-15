const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("eAPI", {
  getKeys: () => ipcRenderer.invoke("get-keys"),
  getValue: (key) => ipcRenderer.invoke("get-val", key),
  setValue: (key, value) => ipcRenderer.invoke("set-val", key, value),
  deleteKey: (key) => ipcRenderer.invoke("delete-key", key),
  appHide: () => ipcRenderer.invoke("app-hide"),
});
