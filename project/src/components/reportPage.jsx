import React, { Component } from "react";
import axios from "axios";
import "./reportStyle.css";

class reportPage extends Component {
  reportSend = () => {
    axios.post(this.props.api + "/report");
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}> Report Someone</h1> <br />
        <form
          class="form-style-9"
          style={{ textAlign: "center" }}
          method="POST"
          action="mailto:xliu72@buffalo.edu"
        >
          <label>
            Seller Username:
            <input
              type="text"
              name="sellerName"
              placeholder="seller username"
            />
          </label>
          <br />
          <label>
            Seller Email:
            <input type="text" name="sellerEmail" placeholder="seller email" />
          </label>
          <br />

          <label>
            Book Name:
            <input type="text" name="bookName" placeholder="book name" />
          </label>
          <br />
          <label>
            Reason of report:
            <br />
            <textarea
              rows="4"
              cols="50"
              name="comment"
              form="usrform"
              placeholder="message"
            />
          </label>
          <br />

          <input type="submit" value="Submit" class="btn btn-primary" />
        </form>
      </React.Fragment>
    );
  }
}

export default reportPage;
