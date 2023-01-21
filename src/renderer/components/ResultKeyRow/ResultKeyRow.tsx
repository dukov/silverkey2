import React from "react";

import "./ResultKeyRow.css";

import ResultKeyBtn from "../ResultKeyBtn/ResultKeyBtn";
import RemoveKeyBtn from "../RemoveKeyBtn/RemoveKeyBtn";
import { ResultKeyProps } from "../Common/Types";

type ResultKeyRowState = {
  selected: boolean;
};

class ResultKeyRow extends React.Component<ResultKeyProps, ResultKeyRowState> {
  state = { selected: false };
  render(): React.ReactNode {
    return (
      <div
        className={
          this.state.selected ? "result-key-row-selected" : "result-key-row"
        }
      >
        <ResultKeyBtn searchKey={this.props.searchKey} />
        <RemoveKeyBtn searchKey={this.props.searchKey} />
      </div>
    );
  }
}

export default ResultKeyRow;
