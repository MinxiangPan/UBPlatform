import React, { Component } from "react";
import Helmet from "react-helmet";
import PolicyPage from "./policyPage.jsx";
import { Nav } from "react-bootstrap";
import TermsOfUse from "./termsOfUse.jsx";
import { SocialIcon } from "react-social-icons";
import "./footerStyle.css";

class Footer extends Component {
  handleScrollTop() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="footer">
        <footer className="page-footer bg-dark">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3" style={{ color: "white" }}>
                <h5 className="text-uppercase">Contact US</h5>
                <p>Email: Please contact us platformtest147@gmail.com</p>
                <p>Phone: Coming soon</p>
              </div>

              <hr className="clearfix w-100 d-md-none pb-3" />

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{ color: "white" }}>
                  Career Page
                </h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Join Team</a>
                  </li>
                  <li>
                    <a href="#!">Seek Career</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{ color: "white" }}>
                  See Team
                </h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Post Question</a>
                  </li>
                  <li>
                    <a href="#!">Seek Question</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Nav>
            <Nav.Link
              onClick={this.handleScrollTop}
              href="#policyPage"
              onSelect={() => {
                this.props.setContent(<PolicyPage />);
              }}
            >
              Policy
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={this.handleScrollTop}
              href="#termsOfUse"
              onSelect={() => {
                this.props.setContent(<TermsOfUse />);
              }}
            >
              Terms of Use
            </Nav.Link>
          </Nav>
          <div
            className="footer-copyright text-center py-3"
            style={{ color: "white" }}
          >
            <p>© 2019 Copyright</p>
            <a href="https://www.matpan.com/UBPlatform/"> UB Platform</a>
          </div>
          <div class="icon">
            <SocialIcon url="http://twitter.com/" />
            <SocialIcon url="http://facebook.com/" />
            <SocialIcon url="http://linkedin.com/" />
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
