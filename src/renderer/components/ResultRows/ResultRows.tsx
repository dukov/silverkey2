import React from "react";

import "./ResultRows.css";

import ResultKeyRow from "../ResultKeyRow/ResultKeyRow";

type ResultRowsProp = {
  resultKeys: string[];
  selected_idx: number;
  doRemoveKey: (k: string) => void;
};

class ResultRows extends React.Component<ResultRowsProp> {
  render(): React.ReactNode {
    const rows = this.props.resultKeys.map((resultKey, idx) => {
      let sel = false;
      if (this.props.selected_idx == idx) {
        sel = true;
      }
      return (
        <ResultKeyRow
          key={idx}
          searchKey={resultKey}
          selected={sel}
          doRemoveKey={this.props.doRemoveKey}
        />
      );
    });
    return (
      <div className="result-rows" id="result-rows">
        {rows}
      </div>
    );
  }
}

export default ResultRows;
