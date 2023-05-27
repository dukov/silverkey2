import * as fs from "fs";

import { GitHubClient } from "./github";
import { ArtifactSourceClient } from "./interface";
import { getLogger } from "../logging/logger";

const log = getLogger();

type WatcherConfig = {
  artifactName: string;
  currentVersion: string;
  checkInterval: number;
  savePath: string;
  owner: string;
  repo: string;
  token: string;
  installCallBack: (path: string) => void;
};

export class UpdateWatcher {
  currentVersion: string;
  interval: number;
  artifactClient: ArtifactSourceClient;
  artifact: string;
  savePath: string;
  installCb: (path: string) => void;
  private lastDownloadedVersion?: string;
  private intervalID: NodeJS.Timer | undefined;
  private lock = false;
  constructor(config: WatcherConfig) {
    this.artifact = config.artifactName;
    this.currentVersion = config.currentVersion;
    this.interval = config.checkInterval;
    this.savePath = config.savePath;
    this.installCb = config.installCallBack;
    this.artifactClient = new GitHubClient(
      config.owner,
      config.repo,
      config.token
    );

    this.artifactClient.on("extracted", (files: string[]) => {
      this.installCb(files[0]);
    });
  }

  stop() {
    if (this.intervalID != undefined) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }
  run() {
    log.info("Starting artifact watcher");
    this.intervalID = setInterval(this.check, this.interval);
  }

  check = () => {
    if (this.lock) {
      log.debug("Check/Download in progress. Skipping this iteration");
      return;
    }
    void (async () => {
      this.lock = true;
      await this._check();
      this.lock = false;
    })();
  };

  private _check = async () => {
    const lastArtifact = await this.artifactClient.getLastArtifact(
      this.artifact
    );
    if (lastArtifact == null) {
      log.debug("No artifact found. Sleeping");
      return;
    }
    if (lastArtifact.version == this.currentVersion) {
      log.debug("No new artifact. Seeping");
      return;
    }
    if (lastArtifact.version == this.lastDownloadedVersion) {
      log.debug("Artifact already downloaded. Sleeping");
      return;
    }

    log.info("Found new artifact. Downloading");
    try {
      fs.rmSync(this.savePath, { recursive: true });
    } catch (e) {
      if (e instanceof Error && e.message.indexOf("ENOENT") != -1) {
        log.warn("Artifact download dir does not exists. Skipping removal");
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
      log.error("Failed to download. Error: ", e);
    }
  };
}
