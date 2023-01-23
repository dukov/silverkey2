import React from "react";

import "./RemoveKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

type RemoveKeyBtnProps = ResultKeyProps & {
  doRemoveKey: (k: string) => Promise<void>;
};

class RemoveKeyBtn extends React.Component<RemoveKeyBtnProps> {
  onClick = async () => {
    await this.props.doRemoveKey(this.props.searchKey);
  };
  render() {
    return (
      <div className="result-key-remove">
        <a href="#" className="remove-key-lnk" onClick={void this.onClick}>
          -
        </a>
      </div>
    );
  }
}

export default RemoveKeyBtn;
