import { contextBridge, ipcRenderer } from "electron";

const electronRPC = {
  getKeys: (): Promise<string[]> =>
    ipcRenderer.invoke("get-keys") as Promise<string[]>,
  getValue: (key: string): Promise<string> =>
    ipcRenderer.invoke("get-val", key) as Promise<string>,
  setValue: (key: string, value: string) =>
    ipcRenderer.invoke("set-val", key, value),
  deleteKey: (key: string) => ipcRenderer.invoke("delete-key", key),
  appHide: () => ipcRenderer.invoke("app-hide"),
};

contextBridge.exposeInMainWorld("eRPC", electronRPC);

export type ElectronRPC = typeof electronRPC;
