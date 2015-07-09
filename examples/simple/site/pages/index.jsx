import React from "react";

import DefaultLayout from "../layouts/default.jsx";

export default React.createClass({
  render() {
    console.log("PROPS", this.props.data);
    return <DefaultLayout data={this.props.data}>
      <div>
        pippo123 {JSON.stringify(this.props.data)}
      </div>
    </DefaultLayout>;
  }
});
