import React from "react";

import "./ResultKeyBtn.css";

import { ResultKeyProps } from "../Common/Types";

class ResultKeyBtn extends React.Component<ResultKeyProps> {
  onClick = () => {
    void (async () => {
      const val = await window.eRPC.getValue(this.props.searchKey);
      await navigator.clipboard.writeText(val);
      await window.eRPC.appHide();
      window.close();
    })();
  };
  render(): React.ReactNode {
    return (
      <div className="result-key">
        <a href="#" className="result-key-lnk" onClick={this.onClick}>
          {this.props.searchKey}
        </a>
      </div>
    );
  }
}

export default ResultKeyBtn;
