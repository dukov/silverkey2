import React from "react";

import "./SearchInput.css";

class SearchInput extends React.Component {
  render() {
    return (
      <div className="search-input">
        <input type="text" className="search-key" id="search-input" />
      </div>
    );
  }
}

export default SearchInput;
