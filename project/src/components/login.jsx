import React, { Component } from "react";
import { LoginWrapper, LoginBox, Input, Button } from "./loginStyle";

class login extends Component {
  state = { username: null, password: null };

  render() {
    return (
      <React.Fragment>
        <LoginWrapper>
          <LoginBox>
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
                this.props.LogintoDB({
                  username: this.state.username,
                  password: this.state.password
                })
              }
            >
              Login to System
            </Button>
          </LoginBox>
        </LoginWrapper>
      </React.Fragment>
    );
  }
}

export default login;
