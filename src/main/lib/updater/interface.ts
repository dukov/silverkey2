import EventEmitter from "events";

export interface Artifact {
  name: string;
  id: number;
  version: string;
}

export interface ArtifactSourceClient extends EventEmitter {
  getLastArtifact(name: string): Promise<Artifact | null>;
  downloadArtifact(id: number, path: string): Promise<string[]>;
}
