import React, { Component } from "react";
import { LoginWrapper, LoginBox, Input, Button } from "./loginStyle";
import axios from "axios";
import ResetPass from "./resetPass";
import FacebookLogin from "react-facebook-login";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import FontAwesome from "react-fontawesome";

class login extends Component {
  state = { username: "", password: "" };

  LogintoDB = json => {
    axios
      .post(this.props.api + "/login", json)
      .then(res => {
        if (!res.data.success && res.data.user == null) {
          alert("Username or Password is incorrect.");
          return 0;
        }
        this.props.login(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const responseGoogle = response => {
      this.LogintoDB({
        username: response.profileObj.name,
        password: response.El
      });
    };

    return (
      <React.Fragment>
        <LoginWrapper>
          <LoginBox>
            <h1>Login Page</h1>
            <label>
              Username:
              <Input
                type="text"
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="username"
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
                this.LogintoDB({
                  username: this.state.username,
                  password: this.state.password
                })
              }
            >
              Login to System
            </Button>
            <a
              onClick={() =>
                this.props.setContent(
                  <ResetPass
                    setContent={this.props.setContent}
                    api={this.props.api}
                  />
                )
              }
            >
              Forget Password?
            </a>
          </LoginBox>
          <GoogleLogin
            clientId={
              "943603281803-2glvdsuq90n8lbcttmlkk63t0nh1amnl.apps.googleusercontent.com"
            }
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <FontAwesome name="google" />
            <span> Login with Google</span>
          </GoogleLogin>
        </LoginWrapper>
      </React.Fragment>
    );
  }
}

export default login;
