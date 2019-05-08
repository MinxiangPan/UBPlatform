import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class PolicyPage extends Component {
  render() {
    return (
      <div>
        <marquee>This platform was found by a group of UB students</marquee>

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
        <div class="position-relative overflow-hidden p-8 p-md-8 m-md-8 text-center bg-light">
          <div class="col-md-8 p-lg-8 mx-auto my-8">
            <h1 class="display-8 font-weight-normal">Need Help?</h1>
            <p class="lead font-weight-normal">
              If you are new to our website, you can check our some tutorial for
              the functionalities of our platform
            </p>

            <div class="position-relative overflow-hidden p-8 p-md-8 m-md-8 text-center bg-light">
              <div class="col-md-8 p-lg-8 mx-auto my-8">
                <h1 class="display-10 font-weight-normal">
                  How to register an account and login to your account?
                </h1>
                <p class="lead font-weight-normal">
                  You can register an account by clicking the icon in the upper
                  right section. You can login to you account by click the icon
                  in the header
                </p>

                <h1 class="display-10 font-weight-normal">
                  Procedure of buying and selling a book.
                </h1>
                <p class="lead font-weight-normal">
                  <li>
                    In order to become a seller, you have to register an account
                    first. Once you are log in, you can go to account page and
                    start selling a book.
                  </li>
                  <li>
                    In order to buy an item, you are not required to register an
                    account. You can contact seller directly by clicking more
                    detail on a book to see the contact infomation.
                  </li>
                </p>
              </div>
            </div>
          </div>
        </div>

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
        </div>
      </div>
    );
  }
}

export default PolicyPage;
