import React, { ChangeEvent } from "react";

import "./ValueInput.css";

type ValueInputProp = {
  value: string;
  updateValue: (s: string) => void;
};

class ValueInput extends React.Component<ValueInputProp> {
  onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateValue(evt.target.value);
  };
  render(): React.ReactNode {
    return (
      <textarea
        className="add-value-textarea"
        autoFocus
        value={this.props.value}
        onChange={this.onChange}
      ></textarea>
    );
  }
}

export default ValueInput;
