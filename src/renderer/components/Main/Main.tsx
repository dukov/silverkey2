import React from "react";

import "./Main.css";

import SearchRow from "../SearchRow/SearchRow";
import ResultRows from "../ResultRows/ResultRows";
import { AddKeyBtnState } from "../Common/Types";
import ValueInput from "../ValueInput/ValueInput";

type MainState = {
  searchVal: string;
  searchFocus: boolean;
  filteredKeys: string[];
  selectedID: number | null;
  addOrSave: AddKeyBtnState;
  valueToAdd: string;
  dbNames: string[];
  selectedDB: string;
};

class Main extends React.Component<{}, MainState> {
  state = {
    searchVal: "",
    searchFocus: false,
    filteredKeys: [],
    allKeys: [],
    selectedID: 0,
    addOrSave: AddKeyBtnState.Add,
    valueToAdd: "",
    dbNames: [],
    selectedDB: "default",
  };
  allKeys: string[] = [];
  async readAllKeys(): Promise<string[]> {
    const allKeys = await window.eRPC.getKeys();
    console.log(`Updating from DB. Retrieved ${allKeys.length} keys from DB`);
    return allKeys;
  }
  async componentDidMount() {
    this.allKeys = await this.readAllKeys();
    const dbNames = await window.eRPC.getKVDBs();
    const selDB = await window.eRPC.getSelectedDB();
    this.setState({ dbNames: dbNames, selectedDB: selDB });
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
      this.setState({
        filteredKeys: filtered,
        searchVal: flt,
        searchFocus: false,
      });
    } else {
      this.setState({ searchVal: flt, searchFocus: false });
    }
  };

  deSelectAll = () => {
    this.setState({ selectedID: null });
  };

  moveSelectorUp = () => {
    let curID = this.state.selectedID != null ? this.state.selectedID : 0;
    if (curID > 0) {
      curID--;
      this.setState({ selectedID: curID });
    }
  };
  moveSelectorDown = () => {
    let curID = this.state.selectedID != null ? this.state.selectedID : -1;
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
      searchFocus: true,
    });
  };

  removeKey = async (k: string) => {
    await window.eRPC.deleteKey(k);
    this.allKeys = await this.readAllKeys();
    const filtered = this._filterKeys(this.state.searchVal);
    this.setState({ filteredKeys: filtered, selectedID: 0 });
  };

  showAddKey = () => {
    // Switching to 'add value' mode. need to drop selected id
    this.setState({ addOrSave: AddKeyBtnState.Save, selectedID: null });
  };

  updateValueToAdd = (newValue: string) => {
    this.setState({ valueToAdd: newValue });
  };

  changeDB = (dbName: string) => {
    void (async () => {
      await window.eRPC.selectDB(dbName);
      this.allKeys = await this.readAllKeys();
      const filtered = this._filterKeys(this.state.searchVal);
      this.setState({ selectedDB: dbName, filteredKeys: filtered });
    })();
  };
  render() {
    let res = undefined;
    if (this.state.addOrSave == AddKeyBtnState.Add) {
      res = (
        <ResultRows
          resultKeys={this.state.filteredKeys}
          selected_idx={this.state.selectedID}
          doRemoveKey={this.removeKey}
          deSelectAll={this.deSelectAll}
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
    window.requestAnimationFrame(() => {
      window.resizeTo(800, document.body.offsetHeight + 40);
    });
    return (
      <div className="main">
        <SearchRow
          databases={this.state.dbNames}
          searchVal={this.state.searchVal}
          searchFocus={this.state.searchFocus}
          selectedKey={
            // Selected key is empty if selected id null
            this.state.selectedID != null
              ? this.state.filteredKeys[this.state.selectedID]
              : ""
          }
          selectedDB={this.state.selectedDB}
          filterKeys={this.filterKeys}
          moveUp={this.moveSelectorUp}
          moveDown={this.moveSelectorDown}
          addOrSave={this.state.addOrSave}
          saveKey={this.saveKey}
          showAddKey={this.showAddKey}
          changeDB={this.changeDB}
        />
        <div className="delimiter"></div>
        {res}
        <div className="footer"></div>
      </div>
    );
  }
}

export default Main;
