import React, { Component } from "react";
import axios from "axios";

class reportPage extends Component {
  reportSend = () => {
    axios.post(this.props.api + "/report");
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}> Report Someone</h1> <br />
        <form
          style={{ textAlign: "center" }}
          method="POST"
          action="mailto:xliu72@buffalo.edu"
        >
          <label>
            Seller Username:
            <input type="text" name="sellerName" />
          </label>
          <br />
          <label>
            Seller Email:
            <input type="text" name="sellerEmail" />
          </label>
          <br />

          <label>
            Book Name:
            <input type="text" name="bookName" />
          </label>
          <br />
          <label>
            Reason of report:
            <br />
            <textarea rows="4" cols="50" name="comment" form="usrform" />
          </label>
          <br />

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default reportPage;
