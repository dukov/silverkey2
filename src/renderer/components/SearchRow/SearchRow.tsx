import React, { ChangeEvent } from "react";

import "./SearchRow.css";

import SearchInput, { SearchInputProps } from "../SearchInput/SearchInput";
import AddKeyBtn from "../AddKeyBtn/AddKeyBtn";
import RunFreeplaneBtn from "../RunFreeplaneBtn/RunFreeplaneBtn";
import { AddKeyBtnState } from "../Common/Types";

type SearchRowExt = {
  searchVal: string;
  searchFocus: boolean;
  selectedKey: string;
  addOrSave: AddKeyBtnState;
  databases: string[];
  selectedDB: string;
  saveKey: () => Promise<void>;
  showAddKey: () => void;
  changeDB: (dbName: string) => void;
};

type SearchRowProp = SearchInputProps & SearchRowExt;

class SearchRow extends React.Component<SearchRowProp> {
  onDbChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    this.props.changeDB(evt.target.value);
  };

  render() {
    //const magnifier = "\u1F50E";
    return (
      <div className="search-row">
        <div className="search-left"></div>
        <div className="search-db">
          <select onChange={this.onDbChange} value={this.props.selectedDB}>
            {this.props.databases.map((val: string) => {
              return <option value={val}>{val}</option>;
            })}
          </select>
        </div>
        <div className="search-magnifier">&#x1F50E;</div>
        <SearchInput
          searchVal={this.props.searchVal}
          selectedKey={this.props.selectedKey}
          filterKeys={this.props.filterKeys}
          moveUp={this.props.moveUp}
          moveDown={this.props.moveDown}
          searchFocus={this.props.searchFocus}
        />
        <AddKeyBtn
          addOrSave={this.props.addOrSave}
          showAddKey={this.props.showAddKey}
          saveKey={this.props.saveKey}
        />
        <RunFreeplaneBtn />
      </div>
    );
  }
}

export default SearchRow;
