import React, { Component } from "react";

class FaqPage extends Component {
  render() {
    return (
      <div>
        <p>
          <div style={{ textAlign: "center" }}>
            <strong> Frequently Asked Questions</strong>
          </div>
          <br />
          <br />
          <br />
          <strong>When is UB Platform established? </strong> <br />
          Our company established in 2019, found by five students while at the
          University at Buffalo. <br />
          <br />
          <strong>Does our platform have online payment?</strong>
          <br />
          Unfortunately, no. You have to contact seller directly.
          <br />
          <br />
          <strong>What do I do if I forgot my account password?</strong>
          <br />
          You can reset password by clicking the forgot password option, a
          temporary password will be sent to you email.
          <br />
          <br />
          <strong> Is UB Platform free?</strong>
          <br />
          Yes!
          <br />
          <br />
          <strong>
            {" "}
            Does UB Platform handle the transcation of buying and selling?
          </strong>
          <br />
          No, we dont. Our mission is host a website to help students to sell
          they book as well as those who need buy book, we don't handle
          transcation since our platform is free and we don't have online
          payment option.
          <br />
        </p>
        <div style={{ textAlign: "center" }}>
          <strong>Last update: 4/17/2019</strong>
        </div>{" "}
      </div>
    );
  }
}

export default FaqPage;
