import React from "react";
import Html from "react-html";

const DefaultLayout = React.createClass({
  render() {
    return <Html>
      {this.props.children}
    </Html>;
  }
});

export default DefaultLayout;
