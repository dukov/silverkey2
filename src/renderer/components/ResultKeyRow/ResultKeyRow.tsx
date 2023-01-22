import React from "react";

import "./ResultKeyRow.css";

import ResultKeyBtn from "../ResultKeyBtn/ResultKeyBtn";
import RemoveKeyBtn from "../RemoveKeyBtn/RemoveKeyBtn";
import { ResultKeyProps } from "../Common/Types";

type ResultKeyRowExtra = {
  selected: boolean;
  doRemoveKey: (k: string) => void;
};

type ResultKeyRowProps = ResultKeyProps & ResultKeyRowExtra;

class ResultKeyRow extends React.Component<ResultKeyRowProps> {
  render(): React.ReactNode {
    let classes = "result-key-row";
    if (this.props.selected) {
      classes = "result-key-row result-key-row-selected";
    }
    return (
      <div className={classes}>
        <ResultKeyBtn searchKey={this.props.searchKey} />
        <RemoveKeyBtn
          searchKey={this.props.searchKey}
          doRemoveKey={this.props.doRemoveKey}
        />
      </div>
    );
  }
}

export default ResultKeyRow;
