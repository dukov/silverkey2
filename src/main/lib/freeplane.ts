import fs from "fs";
import { execFile, ChildProcess } from "child_process";
import { getLogger } from "./logging/logger";

const MAC_FREEPLANE_DEFAULT_PATH =
  "/Applications/Freeplane.app/Contents/MacOS/Freeplane";

const log = getLogger();

export class FreePlaneRunner {
  mmPath: string;
  path: string | null;
  freplane: ChildProcess | null = null;
  onStop: () => void;
  constructor(mmPath: string, onStop: () => void) {
    this.mmPath = mmPath;
    this.onStop = onStop;
    this.path = this.findFreePlaneBinary();
  }
  private findFreePlaneBinary(): string | null {
    if (process.platform == "darwin") {
      return this.findFreePlaneMac();
    } else {
      return null;
    }
  }
  private findFreePlaneMac(): string | null {
    try {
      fs.statSync(MAC_FREEPLANE_DEFAULT_PATH);
    } catch (e) {
      log.error(
        `Freeplane not found in default path ${MAC_FREEPLANE_DEFAULT_PATH}`
      );
      return null;
    }
    return MAC_FREEPLANE_DEFAULT_PATH;
  }
  private spawnFreeplaneProcess(path: string) {
    const fp = execFile(path, [this.mmPath]);
    fp.on("spawn", () => {
      log.info("Freeplane Process started");
      this.freplane = fp;
    });
    fp.on("exit", () => {
      log.info("Freeplane Process stopped");
      this.onStop();
      this.freplane = null;
    });
  }
  run() {
    if (this.path) {
      this.spawnFreeplaneProcess(this.path);
    }
  }
  stop() {
    if (this.freplane) {
      this.freplane.kill();
    }
  }
}
