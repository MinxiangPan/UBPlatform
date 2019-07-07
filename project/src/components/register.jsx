import React, { Component } from "react";
import { RegisterWrapper, RegisterBox, Input, Button } from "./registerStyle";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import Login from "./login.jsx";
import TermsOfUse from "./termsOfUse.jsx";
import PolicyPage from "./policyPage.jsx";
import "./footerStyle.css";

class Register extends Component {
  state = {
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null
  };
  handleScrollTop() {
    window.scrollTo(0, 0);
  }

  putDataToUserDB = json => {
    if (this.state.username == "" || this.state.email == "" || this.state.firstname == "" || this.state.lastname == "" || this.state.password == "" || this.state.username == null || this.state.email == null || this.state.firstname == null || this.state.lastname == null || this.state.password == null) {
      alert ("All fields are required.")
    }
    else {
    axios
      .post(this.props.api + "/putUser", json)
      .then(res => {
        if (res.data.success) {
          alert("Register Successfully");
          this.props.login(json);
        } else alert("User already exist.");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });}
  };

  responseGoogle = response => {
    this.putDataToUserDB({
      username: response.profileObj.name,
      email: response.profileObj.email,
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      password: response.El,
      interestsList: []
    });
  };

  responseFacebook = response => {
    this.putDataToUserDB({
      username: response.name,
      email: this.state.email,
      firstname: response.name,
      lastname: response.name,
      password: response.id,
      interestsList: []
    });
  };

  render() {

    return (
      <React.Fragment>
        <RegisterWrapper>
          <RegisterBox>
            <h1> Sign up Now</h1>
            <label>
              Username:
              <Input
                type="text"
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="username"
              />
            </label>
            <label>
              Email:
              <Input
                type="text"
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="email"
              />
            </label>
            <label>
              Firstname:
              <Input
                type="text"
                onChange={e => this.setState({ firstname: e.target.value })}
                placeholder="firstname"
              />
            </label>
            <label>
              Lastname:
              <Input
                type="text"
                onChange={e => this.setState({ lastname: e.target.value })}
                placeholder="lastname"
              />
            </label>
            <label>
              Password:
              <Input
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="password"
              />
            </label>

            <Button
              onClick={() =>
                this.putDataToUserDB({
                  username: this.state.username,
                  email: this.state.email,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                  password: this.state.password,
                  interestsList: []
                })
              }
            >
              Register
            </Button>
            <hr />
            <span> Or Sign up with your social network!</span>
            <br />
            <GoogleLogin
              clientId={
                "943603281803-2glvdsuq90n8lbcttmlkk63t0nh1amnl.apps.googleusercontent.com"
              }
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  type="button"
                  class="google-button"
                >
                  <span class="google-button__icon">
                    <svg
                      viewBox="0 0 366 372"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                        id="Shape"
                        fill="#EA4335"
                      />
                      <path
                        d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                        id="Shape"
                        fill="#FBBC05"
                      />
                      <path
                        d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                        id="Shape"
                        fill="#4285F4"
                      />
                      <path
                        d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                        fill="#34A853"
                      />
                    </svg>
                  </span>
                  <span class="google-button__text">Sign up with Google</span>
                </button>
              )}
            />
            <br />
            <FacebookLogin
              appId="449634015806449" //APP ID NOT CREATED YET
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => (
                <div class="box">
                  <div class="button-container">
                    <a href="#" class="facebook-login">
                      <span class="facebook-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 216 216"
                          class="_5h0m"
                          color="#FFFFFF"
                        >
                          <path
                            fill="#FFFFFF"
                            d="
                    M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
                    11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
                    11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
                    15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
                    11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
                          />
                        </svg>
                      </span>
                      <span
                        onClick={renderProps.onClick}
                        class="facebook-login-text"
                      >
                        Sign up With Facebook
                      </span>
                    </a>
                  </div>
                </div>
              )}
            />
            <hr />
            <div>
              <span>Already have an account? </span>
              <span
                style={{ margin: "5px", color: "red" }}
                variant="outline-primary"
                onClick={() =>
                  this.props.setContent(
                    <Login
                      login={this.login}
                      api={this.props.api}
                      setContent={this.props.setContent}
                    />
                  )
                }
              >
                Sign in here
              </span>
            </div>
            <div>
              <span>
                <hr />
                By signing up, you agree to our UBPlatform’s
              </span>
              <a
                href="#policyPage"
                onClick={() => {
                  this.handleScrollTop();
                  this.props.setContent(<PolicyPage />);
                }}
              >
                Privacy policy
              </a>
              <span> and </span>
              <a
                href="#termsOfUse"
                onClick={() => {
                  this.handleScrollTop();
                  this.props.setContent(<TermsOfUse />);
                }}
              >
                Terms of Use
              </a>
            </div>
          </RegisterBox>
        </RegisterWrapper>
      </React.Fragment>
    );
  }
}

export default Register;