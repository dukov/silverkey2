import React from "react";

import "./Main.css";

import SearchRow from "../SearchRow/SearchRow";
import ResultRows from "../ResultRows/ResultRows";
import { AddKeyBtnState } from "../Common/Types";
import ValueInput from "../ValueInput/ValueInput";

type MainState = {
  searchVal: string;
  filteredKeys: string[];
  selectedID: number;
  addOrSave: AddKeyBtnState;
  valueToAdd: string;
};

class Main extends React.Component<{}, MainState> {
  state = {
    searchVal: "",
    filteredKeys: [],
    allKeys: [],
    selectedID: 0,
    addOrSave: AddKeyBtnState.Add,
    valueToAdd: "",
  };
  allKeys: string[] = [];
  async readAllKeys(): Promise<string[]> {
    const allKeys = await window.eRPC.getKeys();
    console.log(`Updating from DB. Retrieved ${allKeys.length} keys from DB`);
    return allKeys;
  }
  async componentDidMount() {
    this.allKeys = await this.readAllKeys();
  }

  private _filterKeys = (flt: string): string[] => {
    if (flt == "") return [];
    const searchText = flt.toUpperCase();
    return this.allKeys.filter(
      (key: string) => key.toUpperCase().indexOf(searchText) > -1
    );
  };

  filterKeys = (flt: string) => {
    if (this.state.addOrSave == AddKeyBtnState.Add) {
      const filtered = this._filterKeys(flt);
      this.setState({ filteredKeys: filtered, searchVal: flt });
    }
  };

  moveSelectorUp = () => {
    let curID = this.state.selectedID;
    if (curID > 0) {
      curID--;
      this.setState({ selectedID: curID });
    }
  };
  moveSelectorDown = () => {
    let curID = this.state.selectedID;
    if (curID < this.state.filteredKeys.length - 1) {
      curID++;
      this.setState({ selectedID: curID });
    }
  };

  saveKey = async () => {
    if (this.state.searchVal == "") {
      console.log("Key is empty");
      return;
    }
    await window.eRPC.setValue(this.state.searchVal, this.state.valueToAdd);
    this.allKeys = await this.readAllKeys();
    const filtered = this._filterKeys(this.state.searchVal);
    this.setState({
      addOrSave: AddKeyBtnState.Add,
      valueToAdd: "",
      filteredKeys: filtered,
    });
  };

  removeKey = async (k: string) => {
    await window.eRPC.deleteKey(k);
    this.allKeys = await this.readAllKeys();
    const filtered = this._filterKeys(this.state.searchVal);
    this.setState({ filteredKeys: filtered, selectedID: 0 });
  };

  showAddKey = () => {
    this.setState({ addOrSave: AddKeyBtnState.Save });
  };

  updateValueToAdd = (newValue: string) => {
    this.setState({ valueToAdd: newValue });
  };

  render() {
    let res = undefined;
    if (this.state.addOrSave == AddKeyBtnState.Add) {
      res = (
        <ResultRows
          resultKeys={this.state.filteredKeys}
          selected_idx={this.state.selectedID}
          doRemoveKey={this.removeKey}
        />
      );
    } else {
      res = (
        <ValueInput
          value={this.state.valueToAdd}
          updateValue={this.updateValueToAdd}
        />
      );
    }

    return (
      <div className="main">
        <SearchRow
          searchVal={this.state.searchVal}
          selectedKey={this.state.filteredKeys[this.state.selectedID]}
          filterKeys={this.filterKeys}
          moveUp={this.moveSelectorUp}
          moveDown={this.moveSelectorDown}
          addOrSave={this.state.addOrSave}
          saveKey={this.saveKey}
          showAddKey={this.showAddKey}
        />
        <div className="delimiter"></div>
        {res}
        <div className="footer"></div>
      </div>
    );
  }
}

export default Main;
