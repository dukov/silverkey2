import { exec } from "child_process";

const installPackageDarwin = (path: string) => {
  const installer = exec(`open "${path}"`);
};
const installPackageWin = (path: string) => {};
const installPackageLinux = (path: string) => {};

const INSTALLER_MAP: { [key: string]: (path: string) => void } = {
  linux: installPackageLinux,
  darwin: installPackageDarwin,
  win32: installPackageWin,
};
export const installPackage = (path: string) => {
  const installer = INSTALLER_MAP[process.platform];
  if (installer) {
    installer(path);
  }
};
