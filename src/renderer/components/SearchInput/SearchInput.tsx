import React, { ChangeEvent, KeyboardEvent } from "react";

import "./SearchInput.css";

export type SearchInputProps = {
  filterKeys: (filterTxt: string) => void;
};

type SearchInputState = {
  enteredVal: string;
};

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  state = { enteredVal: "" };
  processKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {};
  processChange = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({ enteredVal: evt.target.value });
    this.props.filterKeys(evt.target.value);
  };
  render() {
    return (
      <div className="search-input">
        <input
          type="text"
          className="search-key"
          id="search-input"
          value={this.state.enteredVal}
          onKeyUp={this.processKeyUp}
          onChange={this.processChange}
        />
      </div>
    );
  }
}

export default SearchInput;