import { ElectronRPC } from "main/preload";

declare global {
  interface Window {
    eRPC: ElectronRPC;
  }
}

export {};
