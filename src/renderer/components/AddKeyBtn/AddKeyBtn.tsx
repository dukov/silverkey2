import React from "react";
import { AddKeyBtnState } from "../Common/Types";

import "./AddKeyBtn.css";

type AddKeyBtnProp = {
  addOrSave: AddKeyBtnState;
  saveKey: () => Promise<void>;
  showAddKey: () => void;
};

class AddKeyBtn extends React.Component<AddKeyBtnProp> {
  processOnClick = async () => {
    if (this.props.addOrSave == AddKeyBtnState.Add) {
      this.props.showAddKey();
    } else if (this.props.addOrSave == AddKeyBtnState.Save) {
      await this.props.saveKey();
    }
  };
  render() {
    const buttonStates = {
      [AddKeyBtnState.Add]: "\u2795",
      [AddKeyBtnState.Save]: "\u2714\uFE0F",
    };
    return (
      <div className="add-key">
        <a
          href="#"
          className="add-save-key"
          id="add-key"
          onClick={void this.processOnClick}
        >
          {buttonStates[this.props.addOrSave]}
        </a>
      </div>
    );
  }
}

export default AddKeyBtn;
