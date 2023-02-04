import { exec } from "child_process";

const installPackageDarwin = (path: string) => {
  exec(`open "${path}"`);
};
const installPackageWin = () => {
  throw new Error("Not implemented");
};
const installPackageLinux = () => {
  throw new Error("Not implemented");
};

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
