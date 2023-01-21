import React from "react";

import "./ResultRows.css";

import ResultKeyRow from "../ResultKeyRow/ResultKeyRow";

type ResultRowsProp = {
  resultKeys: string[];
};

class ResultRows extends React.Component<ResultRowsProp> {
  render(): React.ReactNode {
    return (
      <div className="result-rows" id="result-rows">
        {this.props.resultKeys.map((resultKey, idx) => (
          <ResultKeyRow key={idx} searchKey={resultKey} />
        ))}
      </div>
    );
  }
}

export default ResultRows;
