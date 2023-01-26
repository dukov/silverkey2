export interface Artifact {
  name: string;
  id: number;
  version: string;
}
export interface ArtifactSourceClient {
  getLastArtifact(name: string): Promise<Artifact | null>;
  downloadArtifact(id: number, path: string): Promise<string[]>;
}
