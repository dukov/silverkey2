import React from "react";

import "./SearchRow.css";

import SearchInput, { SearchInputProps } from "../SearchInput/SearchInput";
import AddKeyBtn from "../AddKeyBtn/AddKeyBtn";

class SearchRow extends React.Component<SearchInputProps> {
  render() {
    return (
      <div className="search-row">
        <div className="search-left"></div>
        <SearchInput
          filterKeys={this.props.filterKeys}
          moveUp={this.props.moveUp}
          moveDown={this.props.moveDown}
        />
        <AddKeyBtn />
      </div>
    );
  }
}

export default SearchRow;
