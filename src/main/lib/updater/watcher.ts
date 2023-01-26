import * as fs from "fs";

import { GitHubClient } from "./github";
import { ArtifactSourceClient } from "./interface";

type WatcherConfig = {
  artifactName: string;
  currentVersion: string;
  checkInterval: number;
  savePath: string;
  owner: string;
  repo: string;
  token: string;
};

export class UpdateWatcher {
  currentVersion: string;
  interval: number;
  artifactClient: ArtifactSourceClient;
  artifact: string;
  savePath: string;
  private lastDownloadedVersion?: string;
  constructor(config: WatcherConfig) {
    this.artifact = config.artifactName;
    this.currentVersion = config.currentVersion;
    this.interval = config.checkInterval;
    this.savePath = config.savePath;
    this.artifactClient = new GitHubClient(
      config.owner,
      config.repo,
      config.token
    );
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  }
  async run() {
    console.log("Starting artifact watcher");
    while (true) {
      await this.sleep(this.interval);
      let lastArtifact = await this.artifactClient.getLastArtifact(
        this.artifact
      );
      console.log(lastArtifact);
      if (lastArtifact == null) {
        console.log("No artifact found. Sleeping");
        continue;
      }
      if (lastArtifact.version == this.lastDownloadedVersion) {
        console.log(lastArtifact.version, this.lastDownloadedVersion);
        console.log("Artifact already downloaded. Sleeping");
        continue;
      }
      if (lastArtifact.version == this.currentVersion) {
        console.log("No new artifact. Seeping");
        continue;
      }

      console.log("Found new artifact. Downloading");
      fs.rmSync(this.savePath, { recursive: true });
      await this.artifactClient.downloadArtifact(
        lastArtifact.id,
        this.savePath
      );
      this.lastDownloadedVersion = lastArtifact.version;
    }
  }
}
