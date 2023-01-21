import React from "react";

import "./Main.css";

import Delimiter from "../Delimiter/Delimiter";
import SearchRow from "../SearchRow/SearchRow";
import Footer from "../FooterRow/Footer";
import ResultRows from "../ResultRows/ResultRows";

type MainState = {
  filteredKeys: string[];
  allKeys: string[];
};

class Main extends React.Component<{}, MainState> {
  state = { filteredKeys: [], allKeys: [] };
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
  render() {
    return (
      <div className="main">
        <SearchRow filterKeys={this.filterKeys} />
        <Delimiter />
        <ResultRows resultKeys={this.state.filteredKeys} />
        <Footer />
      </div>
    );
  }
}

export default Main;
