import React, { Component } from "react";

class EditorComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange, index } = this.props;
    return (
      <div style={{ width: "200px", height: "210px" }}>
        <input
          style={{ width: "190px", height: "30px" }}
          value={value.title || ""}
          onChange={(e) => {
            onChange(index, e.target.value, "title");
          }}
        ></input>
        <textarea
          placeholder="여기에 입력하세요"
          style={{ width: "190px", height: "160px", resize: "none" }}
          value={value.content || ""}
          onChange={(e) => {
            onChange(index, e.target.value, "content");
          }}
        ></textarea>
      </div>
    );
  }
}
export default EditorComponent;
