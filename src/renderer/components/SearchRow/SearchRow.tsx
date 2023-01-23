import React from "react";

import "./SearchRow.css";

import SearchInput, { SearchInputProps } from "../SearchInput/SearchInput";
import AddKeyBtn from "../AddKeyBtn/AddKeyBtn";
import { AddKeyBtnState } from "../Common/Types";

type SearchRowExt = {
  searchVal: string;
  selectedKey: string;
  addOrSave: AddKeyBtnState;
  saveKey: () => Promise<void>;
  showAddKey: () => void;
};

type SearchRowProp = SearchInputProps & SearchRowExt;

class SearchRow extends React.Component<SearchRowProp> {
  render() {
    return (
      <div className="search-row">
        <div className="search-left"></div>
        <SearchInput
          searchVal={this.props.searchVal}
          selectedKey={this.props.selectedKey}
          filterKeys={this.props.filterKeys}
          moveUp={this.props.moveUp}
          moveDown={this.props.moveDown}
        />
        <AddKeyBtn
          addOrSave={this.props.addOrSave}
          showAddKey={this.props.showAddKey}
          saveKey={this.props.saveKey}
        />
      </div>
    );
  }
}

export default SearchRow;
