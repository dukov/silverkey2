import EventEmitter from "events";

export const INSTALL_MESSAGE = "install-update";
export const CONFIG_MESSAGE = "config-file";
export const RELOAD_CFG_MESSAGE = "reload-config";

export interface Artifact {
  name: string;
  id: number;
  version: string;
}

export interface ArtifactSourceClient extends EventEmitter {
  getLastArtifact(name: string): Promise<Artifact | null>;
  downloadArtifact(id: number, path: string): Promise<string[]>;
}

export type Message = {
  type: string;
  args: any[];
};
