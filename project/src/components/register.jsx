import React, { Component } from "react";
import { RegisterWrapper, RegisterBox, Input, Button } from "./registerStyle";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

class Register extends Component {
  state = {
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null
  };

  putDataToUserDB = json => {
    if (this.state.username == "" || this.state.email == "" || this.state.firstname == "" || this.state.lastname == "" || this.state.password == "" || this.state.username == null || this.state.email == null || this.state.firstname == null || this.state.lastname == null || this.state.password == null) {
      alert ("All fields are required.")
    }
    else {
    axios
      .post(this.props.api+"/putUser", json)
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

  render() {
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
      </React.Fragment>
    );
  }
}

export default Register;
