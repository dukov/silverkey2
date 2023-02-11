import React, { ChangeEvent } from "react";

import "./RunFreeplaneBtn.css";

class RunFreeplaneBtn extends React.Component {
  inputFile = React.createRef<HTMLInputElement>();

  async runFreeplane(path: string) {
    await window.eRPC.runFreePlane(path);
    window.close();
  }
  onClick = () => {
    (async () => {
      let path = await window.eRPC.getFpPath();
      if (!path) {
        if (this.inputFile.current) this.inputFile.current.click();
      } else {
        this.runFreeplane(path);
      }
    })();
  };
  onFilePathChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const path = evt.target.files[0].path;
      (async () => {
        const settings = await window.eRPC.getSettings();
        settings.freePlanePath.value = path;
        await window.eRPC.saveSettings(settings);
        this.runFreeplane(path);
      })();
    }
  };
  render(): React.ReactNode {
    return (
      <div className="freeplane">
        <input
          type="file"
          id="path-input"
          className="input-file"
          ref={this.inputFile}
          onChange={this.onFilePathChange}
        />
        <a href="#" className="fp-btn" onClick={this.onClick} />
      </div>
    );
  }
}

export default RunFreeplaneBtn;
