import React from "react";

import "./ResultKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

class ResultKeyBtn extends React.Component<ResultKeyProps> {
  render(): React.ReactNode {
    return (
      <div className="result-key">
        <a href="#" className="result-key-lnk">
          {this.props.searchKey}
        </a>
      </div>
    );
  }
}

export default ResultKeyBtn;
