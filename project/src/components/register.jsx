import React, { Component } from "react";
import { RegisterWrapper, RegisterBox, Input, Button } from "./registerStyle";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import FontAwesome from "react-fontawesome";

class Register extends Component {
  state = {
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null
  };

  putDataToUserDB = json => {
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
      });
  };

  render() {
    const responseGoogle = response => {
      this.putDataToUserDB({
        username: response.profileObj.name,
        email: response.profileObj.email,
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        password: response.El,
        interestsList: []
      });
    };

    const responseFacebook = response => {
      console.log(response);
      console.log(response.id);
      console.log(response.name);
      this.putDataToUserDB({
        username: response.name,
        email: this.state.email,
        firstname: response.name,
        lastname: response.name,
        password: response.id,
        interestsList: []
      });
    };

    return (
      <React.Fragment>
        <RegisterWrapper>
          <RegisterBox>
            <h1> Register Page</h1>
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
          </RegisterBox>
        </RegisterWrapper>
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

        <FacebookLogin
          appId="449634015806449" //APP ID NOT CREATED YET
          fields="name,email,picture"
          callback={responseFacebook}
        >
          <FontAwesome name="facebook" />
          <span> Login with facebook</span>
        </FacebookLogin>
      </React.Fragment>
    );
  }
}

export default Register;
