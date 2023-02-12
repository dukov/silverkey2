import React, { ChangeEvent } from "react";

import "./RunFreeplaneBtn.css";

type FreeplaneBtnState = {
  fpBtnClass: string;
};

class RunFreeplaneBtn extends React.Component<{}, FreeplaneBtnState> {
  inputFile = React.createRef<HTMLInputElement>();

  state = {
    fpBtnClass: "fp-btn",
  };
  async runFreeplane(path: string) {
    await window.eRPC.runFreePlane(path);
    this.setState({ fpBtnClass: "fp-btn-jumping" });
    setTimeout(() => {
      window.close();
    }, 10000);
  }
  onClick = () => {
    void (async () => {
      const path = await window.eRPC.getFpPath();
      if (!path) {
        if (this.inputFile.current) this.inputFile.current.click();
      } else {
        await this.runFreeplane(path);
      }
    })();
  };
  onFilePathChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const path = evt.target.files[0].path;
      void (async () => {
        const settings = await window.eRPC.getSettings();
        settings.freePlanePath.value = path;
        await window.eRPC.saveSettings(settings);
        await this.runFreeplane(path);
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
        <a href="#" className={this.state.fpBtnClass} onClick={this.onClick} />
      </div>
    );
  }
}

export default RunFreeplaneBtn;
