import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class PolicyPage extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <div>
            <img src={require("./images/display2.png")} />
            <p className="legend">Current Selling Book in UB Platform</p>
          </div>
          <div>
            <img src="https://financialaid.buffalo.edu/wp-content/blogs.dir/23/files/sites/23/2016/11/buffalo.jpg" />
            <p className="legend">Founds By 4 University at Buffalo students</p>
          </div>
          <div>
            <img src="https://financialaid.buffalo.edu/wp-content/blogs.dir/23/files/sites/23/2016/11/buffalo.jpg" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>

        <div>
          <h1 style={{ textAlign: "center" }}>Our Tech Stack</h1>
          <img
            src="https://www.worksonarm.com/wp-content/uploads/2017/03/mongodb-logo-1.png "
            height="230"
            style={{ marginLeft: "6%" }}
            width="230"
          />
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
            height="230"
            style={{ marginLeft: "6%" }}
            width="230"
          />
          <img
            src=" https://www.sohamkamani.com/static/express-routing-logo-65137ed3c844d05124dcfdab28263c21-ec9c1.png 
"
            height="230"
            style={{ marginLeft: "6%" }}
            width="230"
          />
          <img
            src="https://cdn-images-1.medium.com/max/1200/1*yYN3pRB9mGS-IG_-agqDvA.png"
            height="230"
            style={{ marginLeft: "6%" }}
            width="230"
          />

          <p>
            UBPlatform provides students a online platform to buy and sell items
            with no charge. If you are a student, you must have experience
            spending lots of money on buying expensive first-hand text-book in
            bookstore. Don’t worry, within UBPlatform, you can find all kinds of
            book posted by every other users, no matter for first-hand,
            second-hand or any kinds. Moreover, there is no rule of pricing a
            book, cheaper is better. If you find anything unproper in
            UBPlatform, feel free to email us in report page. Feel free to
            explore your interested items in UBPlatform!
          </p>
        </div>
      </div>
    );
  }
}

export default PolicyPage;
