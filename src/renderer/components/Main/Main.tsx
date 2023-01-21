import React from "react";

import "./Main.css";

import Delimiter from "../Delimiter/Delimiter";
import SearchRow from "../SearchRow/SearchRow";
import Footer from "../FooterRow/Footer";
import ResultRows from "../ResultRows/ResultRows";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <SearchRow />
        <Delimiter />
        <ResultRows />
        <Footer />
      </div>
    );
  }
}

export default Main;
