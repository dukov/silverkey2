import React from "react";
import { AddKeyBtnState } from "../Common/Types";

import "./AddKeyBtn.css";

type AddKeyBtnProp = {
  addOrSave: AddKeyBtnState;
  saveKey: () => void;
  showAddKey: () => void;
};

class AddKeyBtn extends React.Component<AddKeyBtnProp> {
  buttonStates = {
    [AddKeyBtnState.Add]: "\u2795",
    [AddKeyBtnState.Save]: "\u2714\uFE0F",
  };
  buttonActions = {
    [AddKeyBtnState.Add]: this.props.showAddKey,
    [AddKeyBtnState.Save]: this.props.saveKey,
  };

  processOnClick = () => {
    this.buttonActions[this.props.addOrSave]();
  };
  render() {
    return (
      <div className="add-key">
        <a
          href="#"
          className="add-save-key"
          id="add-key"
          onClick={this.processOnClick}
        >
          {this.buttonStates[this.props.addOrSave]}
        </a>
      </div>
    );
  }
}

export default AddKeyBtn;
