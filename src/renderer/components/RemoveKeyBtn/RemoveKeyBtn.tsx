import React from "react";

import "./RemoveKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

class RemoveKeyBtn extends React.Component<ResultKeyProps> {
  render() {
    return (
      <div className="result-key-remove">
        <a href="#" className="remove-key-lnk">
          -
        </a>
      </div>
    );
  }
}

export default RemoveKeyBtn;
