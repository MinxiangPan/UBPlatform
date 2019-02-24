import React, { Component } from "react";
import { RegisterWrapper, RegisterBox, Input, Button } from "./registerStyle";
class Register extends Component {
  state = {
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null
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
                this.props.putDataToUserDB({
                  username: this.state.username,
                  email: this.state.email,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                  password: this.state.password
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
