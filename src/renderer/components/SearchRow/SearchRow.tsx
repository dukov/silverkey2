import React from "react";

import "./SearchRow.css";

import SearchInput from "../SearchInput/SearchInput";
import AddKeyBtn from "../AddKeyBtn/AddKeyBtn";

class SearchRow extends React.Component {
  render() {
    return (
      <div className="search-row">
        <div className="search-left"></div>
        <SearchInput />
        <AddKeyBtn />
      </div>
    );
  }
}

export default SearchRow;
