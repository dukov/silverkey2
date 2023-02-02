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
  private intervalID: NodeJS.Timer | undefined;
  private lock: boolean = false;
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

  stop() {
    if (this.intervalID != undefined) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }
  run() {
    console.log("Starting artifact watcher");
    this.intervalID = setInterval(this.check, this.interval);
  }

  check = async () => {
    if (this.lock) {
      console.log("Check/Download in progress. Skipping this iteration");
      return;
    }
    this.lock = true;
    await this._check();
    this.lock = false;
  };

  private _check = async () => {
    let lastArtifact = await this.artifactClient.getLastArtifact(this.artifact);
    if (lastArtifact == null) {
      console.log("No artifact found. Sleeping");
      return;
    }
    if (lastArtifact.version == this.lastDownloadedVersion) {
      console.log("Artifact already downloaded. Sleeping");
      return;
    }
    if (lastArtifact.version == this.currentVersion) {
      console.log("No new artifact. Seeping");
      return;
    }

    console.log("Found new artifact. Downloading");
    try {
      fs.rmSync(this.savePath, { recursive: true });
    } catch (e) {
      if (e instanceof Error && e.message.indexOf("ENOENT") != -1) {
        console.log("Artifact download dir does tno exists. Skipping removal");
      } else {
        throw e;
      }
    }
    try {
      await this.artifactClient.downloadArtifact(
        lastArtifact.id,
        this.savePath
      );
      this.lastDownloadedVersion = lastArtifact.version;
    } catch (e) {
      console.log("Failed to download");
    }
  };
}
