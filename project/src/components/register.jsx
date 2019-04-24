import React, { Component } from "react";
import { RegisterWrapper, RegisterBox, Input, Button } from "./registerStyle";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    formErrors: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: ""
    },
    usernameValid: false,
    emailValid: false,
    firstnameValid: false,
    lastnameValid: false,
    passwordValid: false,
    formValid: false
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "email is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "password is too short, it has to be greater than 6";
        break;
      case "username":
        usernameValid = value.length >= 4;
        fieldValidationErrors.username = usernameValid
          ? ""
          : "username is too short";
      case "firstname":
        firstnameValid = value.length > 4;
        fieldValidationErrors.firstname = firstnameValid
          ? ""
          : "firstname cannot be empty or it is too short";
      case "lastname":
        lastnameValid = value.length > 4;
        fieldValidationErrors.lastname = lastnameValid
          ? ""
          : "lastname cannot be empty or it is too short";
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        firstnameValid: firstnameValid,
        lastnameValid: lastnameValid,
        usernameValid: usernameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.usernameValid &&
        this.state.firstnameValid &&
        this.state.lastnameValid
    });
  }

  putDataToUserDB = json => {
    let temp = "";
    if (!this.state.formValid) {
      if (!this.state.lastnameValid) {
        temp += this.state.formErrors.lastname + "\n";
      }
      if (!this.state.firstnameValid) {
        temp += this.state.formErrors.firstname + "\n";
      }
      if (!this.state.emailValid) {
        temp += "Email cannot be empty or its invalid email" + "\n";
      }
      if (!this.state.usernameValid) {
        temp += this.state.formErrors.username + "\n";
      }
      if (!this.state.passwordValid) {
        temp += this.state.formErrors.password + "\n";
      }
      alert(temp);
    } else {
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
    }
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
                name="username"
                onChange={this.handleUserInput}
                //value={this.state.username}
                placeholder="username"
              />
            </label>
            <label>
              Email:
              <Input
                type="text"
                name="email"
                onChange={this.handleUserInput}
                // value={this.state.email}
                placeholder="email"
              />
            </label>
            <label>
              Firstname:
              <Input
                type="text"
                name="firstname"
                onChange={this.handleUserInput}
                // value={this.state.firstname}
                placeholder="firstname"
              />
            </label>
            <label>
              Lastname:
              <Input
                type="text"
                name="lastname"
                onChange={this.handleUserInput}
                // value={this.state.lastname}
                placeholder="lastname"
              />
            </label>
            <label>
              Password:
              <Input
                type="password"
                name="password"
                // value={this.state.password}
                onChange={this.handleUserInput}
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
