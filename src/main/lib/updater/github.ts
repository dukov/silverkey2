import EventEmitter from "events";

import { Octokit } from "octokit";
import { components } from "@octokit/openapi-types";
import * as JSZip from "jszip";
import * as fs from "fs";
import { join } from "path";

import { ArtifactSourceClient, Artifact } from "./interface";

export class GitHubClient extends EventEmitter implements ArtifactSourceClient {
  client: Octokit;
  owner: string;
  repo: string;
  constructor(owner: string, repo: string, token: string) {
    super();
    this.client = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
  }
  async getLastArtifact(name: string): Promise<Artifact | null> {
    const rawArtifacts = await this.client.rest.actions.listArtifactsForRepo({
      owner: this.owner,
      repo: this.repo,
      name: name,
    });
    if (rawArtifacts.data.total_count == 0) {
      return null;
    } else {
      const lastArtifact = rawArtifacts.data.artifacts[0];
      if (lastArtifact.workflow_run == null) {
        return null;
      }
      if (lastArtifact.workflow_run.head_sha == null) {
        return null;
      }
      return {
        id: lastArtifact.id,
        name: lastArtifact.name,
        version: lastArtifact.workflow_run.head_sha,
      };
    }
  }

  async downloadArtifact(artifact_id: number, path: string): Promise<string[]> {
    let result: string[] = [];
    console.log("Downloading artifact");
    const rawArtifactLink = await this.client.rest.actions.downloadArtifact({
      owner: this.owner,
      repo: this.repo,
      artifact_id: artifact_id,
      archive_format: "zip",
    });

    fs.mkdirSync(path, { recursive: true });

    if (rawArtifactLink.data instanceof ArrayBuffer) {
      console.log("Unzipping artifact");
      const artArch = await JSZip.loadAsync(rawArtifactLink.data);
      artArch.forEach(async (_, file) => {
        console.log(`Unzipping ${file.name}`);
        let outputPath = join(path, file.name);
        file
          .nodeStream()
          .pipe(fs.createWriteStream(outputPath))
          .on("finish", () => {
            console.log(`File ${file.name} saved`);
            result.push(outputPath);
            if (result.length == Object.keys(artArch.files).length) {
              this.emit("extracted", result);
            }
          });
      });
      return result;
    } else {
      throw new Error("Failed to download artifact");
    }
  }
}
