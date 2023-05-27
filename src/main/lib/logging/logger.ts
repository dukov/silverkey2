import log from "electron-log";

let logger: log.ElectronLog | undefined = undefined;

export const getLogger = (): log.ElectronLog => {
  if (logger) {
    return logger;
  }
  log.transports.console.level = false;
  logger = log;
  return logger;
};
