import React, { ChangeEvent, KeyboardEvent } from "react";

import "./SearchInput.css";

export type SearchInputProps = {
  searchVal: string;
  searchFocus: boolean;
  selectedKey: string;
  filterKeys: (flt: string) => void;
  moveUp: () => void;
  moveDown: () => void;
};

class SearchInput extends React.Component<SearchInputProps> {
  inputRef = React.createRef<HTMLInputElement>();
  processKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    const actionMap: { [key: string]: () => void } = {
      ArrowUp: this.props.moveUp,
      ArrowDown: this.props.moveDown,
    };
    if (evt.key == "Escape") {
      window.close();
    } else if (evt.key == "Enter") {
      if (this.props.selectedKey == "") return;
      void (async () => {
        const val = await window.eRPC.getValue(this.props.selectedKey);
        await navigator.clipboard.writeText(val);
        await window.eRPC.appHide();
        window.close();
      })();
    } else if (actionMap[evt.key] != undefined) {
      actionMap[evt.key]();
    }
  };
  processChange = (evt: ChangeEvent<HTMLInputElement>) => {
    this.props.filterKeys(evt.target.value);
  };
  render() {
    if (this.props.searchFocus && this.inputRef.current) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
    return (
      <div className="search-input">
        <input
          type="text"
          className="search-key"
          autoFocus
          ref={this.inputRef}
          value={this.props.searchVal}
          onKeyUp={this.processKeyUp}
          onChange={this.processChange}
        />
      </div>
    );
  }
}

export default SearchInput;
