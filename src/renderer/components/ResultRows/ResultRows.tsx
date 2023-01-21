import React from "react";

import "./ResultRows.css";

import ResultKeyRow from "../ResultKeyRow/ResultKeyRow";

type ResultRowsState = {
  resultKeys: string[];
};

class ResultRows extends React.Component<{}, ResultRowsState> {
  state = { resultKeys: [] };
  render(): React.ReactNode {
    return (
      <div className="result-rows" id="result-rows">
        {this.state.resultKeys.map((resultKey, idx) => (
          <ResultKeyRow key={idx} searchKey={resultKey} />
        ))}
      </div>
    );
  }
}

export default ResultRows;
