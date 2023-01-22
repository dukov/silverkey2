import React from "react";

import "./RemoveKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

type RemoveKeyBtnProps = ResultKeyProps & {
  doRemoveKey: (k: string) => void;
};

class RemoveKeyBtn extends React.Component<RemoveKeyBtnProps> {
  onClick = () => {
    this.props.doRemoveKey(this.props.searchKey);
  };
  render() {
    return (
      <div className="result-key-remove">
        <a href="#" className="remove-key-lnk" onClick={this.onClick}>
          -
        </a>
      </div>
    );
  }
}

export default RemoveKeyBtn;
