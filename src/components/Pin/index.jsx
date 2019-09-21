import React from "react";

class Pin extends React.Component {
  render() {
    return (
      <div
        id={`pin-${this.props.id}`}
        onClick={this.props.hitPin}
        onMouseOver={this.props.mouseOver}
        className="target-pin pin"
        style={this.props.style}
      ></div>
    );
  }
}

export default Pin;
