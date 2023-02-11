import React, { ChangeEvent } from "react";

import "./RunFreeplaneBtn.css";

type FreeplaneBtnState = {
  freeplanePath: string;
};

class RunFreeplaneBtn extends React.Component<{}, FreeplaneBtnState> {
  state = {
    freeplanePath: "",
  };

  inputFile = React.createRef<HTMLInputElement>();
  async componentDidMount() {
    if (this.state.freeplanePath == "") {
      const settings = await window.eRPC.getSettings();
      if (settings.freePlanePath) {
        this.setState({ freeplanePath: settings.freePlanePath.value });
      }
    }
  }
  onClick = () => {
    if (this.state.freeplanePath == "" && this.inputFile.current) {
      this.inputFile.current.click();
    }
    (async () => {
      await window.eRPC.runFreePlane(this.state.freeplanePath);
    })();
  };
  onFilePathChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const path = evt.target.files[0].path;
      this.setState({ freeplanePath: path });
      (async () => {
        console.log("Saving");
        const settings = await window.eRPC.getSettings();
        if (!settings.freePlanePath) {
          settings.freePlanePath = {
            value: "",
            description: "Path to Freeplane binary",
          };
        }
        settings.freePlanePath.value = path;
        console.log("Settings", settings);
        await window.eRPC.saveSettings(settings);
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
