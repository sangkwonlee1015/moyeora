import React, { Component } from "react";

class EditorComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange, index } = this.props;
    return (
      <div
        style={{
          width: "200px",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <input
          style={{ width: "195px", height: "30px", border: "1px solid", backgroundColor: "#fff2ab" }}
          value={value.title || ""}
          placeholder="위치를 입력해 주세요"
          onChange={(e) => {
            onChange(index, e.target.value, "title");
          }}
        ></input>
        <textarea
          placeholder="메모를 남겨주세요"
          style={{ width: "195px", height: "165px", resize: "none", border: "1px solid", backgroundColor: "#fff7d1" }}
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
