import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("eAPI", {
  getKeys: () => ipcRenderer.invoke("get-keys"),
  getValue: (key: string) => ipcRenderer.invoke("get-val", key),
  setValue: (key: string, value: string) =>
    ipcRenderer.invoke("set-val", key, value),
  deleteKey: (key: string) => ipcRenderer.invoke("delete-key", key),
  appHide: () => ipcRenderer.invoke("app-hide"),
});
