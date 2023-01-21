import React from "react";

import "./SearchInput.css";

type SearchInputState = {
  allKeys: string[];
};

class SearchInput extends React.Component<{}, SearchInputState> {
  state = { allKeys: [] };
  async readAllKeys() {
    const allKeys = await window.eRPC.getKeys();
    console.log(`Updating from DB. Retrieved ${allKeys.length} keys from DB`);
    this.setState({ allKeys: allKeys });
  }
  async componentDidMount() {
    await this.readAllKeys();
  }
  render() {
    return (
      <div className="search-input">
        <input type="text" className="search-key" id="search-input" />
      </div>
    );
  }
}

export default SearchInput;
