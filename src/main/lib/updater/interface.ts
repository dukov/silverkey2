import EventEmitter from "events";

const UPDATER_MESSAGE_TYPE = "updater-message";
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

export class GenericMessage {
  type = "";
  message: string;
  constructor(message: string) {
    this.type = UPDATER_MESSAGE_TYPE;
    this.message = message;
  }
}

export class InstallUpdateMessage extends GenericMessage {
  path: string;
  constructor(path: string) {
    super(INSTALL_MESSAGE);
    this.path = path;
  }
}

export class ConfigFileMessage extends GenericMessage {
  path: string;
  constructor(path: string) {
    super(CONFIG_MESSAGE);
    this.path = path;
  }
}
