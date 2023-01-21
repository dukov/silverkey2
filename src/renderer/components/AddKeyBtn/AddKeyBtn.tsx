import React from "react";

import "./AddKeyBtn.css";

class AddKeyBtn extends React.Component {
  render() {
    return (
      <div className="add-key">
        <a href="#" className="add-save-key" id="add-key">
          &#10133;
        </a>
      </div>
    );
  }
}

export default AddKeyBtn;
