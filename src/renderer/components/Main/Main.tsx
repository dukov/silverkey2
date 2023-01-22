import React from "react";

import "./Main.css";

import SearchRow from "../SearchRow/SearchRow";
import ResultRows from "../ResultRows/ResultRows";
import { AddKeyBtnState } from "../Common/Types";
import ValueInput from "../ValueInput/ValueInput";

type MainState = {
  filteredKeys: string[];
  allKeys: string[];
  selectedID: number;
  addOrSave: AddKeyBtnState;
  valueToAdd: string;
};

class Main extends React.Component<{}, MainState> {
  state = {
    filteredKeys: [],
    allKeys: [],
    selectedID: 0,
    addOrSave: AddKeyBtnState.Add,
    valueToAdd: "",
  };
  async readAllKeys() {
    const allKeys = await window.eRPC.getKeys();
    console.log(`Updating from DB. Retrieved ${allKeys.length} keys from DB`);
    this.setState({ allKeys: allKeys });
  }
  async componentDidMount() {
    await this.readAllKeys();
  }

  filterKeys = (flt: string) => {
    let filtered: string[] = [];
    if (flt != "") {
      const searchText = flt.toUpperCase();
      filtered = this.state.allKeys.filter(
        (key: string) => key.toUpperCase().indexOf(searchText) > -1
      );
    }
    this.setState({ filteredKeys: filtered });
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

  saveKey = () => {
    console.log("Key saved");
    this.setState({ addOrSave: AddKeyBtnState.Add, valueToAdd: "" });
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
