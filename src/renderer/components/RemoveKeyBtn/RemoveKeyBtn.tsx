import React from "react";

import "./RemoveKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

type RemoveKeyBtnProps = ResultKeyProps & {
  doRemoveKey: (k: string) => Promise<void>;
};

class RemoveKeyBtn extends React.Component<RemoveKeyBtnProps> {
  onClick = () => {
    // Use IIFE format to perform await in non async function
    //Promises must be awaited, end with a call to .catch, end with
    //a call to .then with a rejection handler or be explicitly marked
    //as ignored with the `void` operator
    void (async () => {
      await this.props.doRemoveKey(this.props.searchKey);
    })();
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
