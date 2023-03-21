import { contextBridge, ipcRenderer } from "electron";
import { SettingData } from "./lib/settings";

const electronRPC = {
  getKeys: (): Promise<string[]> =>
    ipcRenderer.invoke("get-keys") as Promise<string[]>,
  getValue: (key: string): Promise<string> =>
    ipcRenderer.invoke("get-val", key) as Promise<string>,
  setValue: (key: string, value: string) =>
    ipcRenderer.invoke("set-val", key, value),
  deleteKey: (key: string) => ipcRenderer.invoke("delete-key", key),
  appHide: () => ipcRenderer.invoke("app-hide"),
  isSettings: (cb: () => void) => ipcRenderer.on("show-settings", cb),
  getSettings: (): Promise<SettingData> => {
    return ipcRenderer.invoke("get-settings") as Promise<SettingData>;
  },
  saveSettings: (settings: SettingData) =>
    ipcRenderer.invoke("save-settings", settings),
  runFreePlane: (path: string) => ipcRenderer.invoke("run-freeplane", path),
  getFpPath: (): Promise<string> =>
    ipcRenderer.invoke("get-fp-path") as Promise<string>,
  getKVDBs: (): Promise<string[]> =>
    ipcRenderer.invoke("get-kvdbs") as Promise<string[]>,
  getSelectedDB: (): Promise<string> =>
    ipcRenderer.invoke("get-selected-db") as Promise<string>,
  selectDB: (dbName: string) => ipcRenderer.invoke("select-db", dbName),
};

contextBridge.exposeInMainWorld("eRPC", electronRPC);

export type ElectronRPC = typeof electronRPC;
