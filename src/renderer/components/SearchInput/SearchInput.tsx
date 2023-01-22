import React, { ChangeEvent, KeyboardEvent } from "react";

import "./SearchInput.css";

export type SearchInputProps = {
  searchVal: string;
  filterKeys: (flt: string) => void;
  moveUp: () => void;
  moveDown: () => void;
};

class SearchInput extends React.Component<SearchInputProps> {
  processKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    const actionMap: { [key: string]: () => void } = {
      ArrowUp: this.props.moveUp,
      ArrowDown: this.props.moveDown,
    };
    if (evt.key == "Escape") {
      window.close();
      return;
    } else if (actionMap[evt.key] != undefined) {
      actionMap[evt.key]();
    }
  };
  processChange = (evt: ChangeEvent<HTMLInputElement>) => {
    this.props.filterKeys(evt.target.value);
  };
  render() {
    return (
      <div className="search-input">
        <input
          type="text"
          className="search-key"
          autoFocus
          id="search-input"
          value={this.props.searchVal}
          onKeyUp={this.processKeyUp}
          onChange={this.processChange}
        />
      </div>
    );
  }
}

export default SearchInput;
