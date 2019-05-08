import React, { Component } from "react";
import AddBook from "./addBook";
import BookCardInfo from "./bookCardInfo";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AccountPage extends Component {
  state = {
    buttonClass: "btn btn-secondary",
    buttonClassOp: ["btn btn-secondary", "btn btn-primary"],
    name: this.props.user.firstname,
    email: this.props.user.email,
    currentSellingBook: [],
    intervalIsSet: null,
    userInfo: [
      {
        Header: "Username",
        accessor: "name"
      },
      {
        Header: "Email",
        accessor: "email"
      }
    ],
    password: "",
    newPassword: ""
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getMyCurrentSellingBook();

    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getMyCurrentSellingBook, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  //new function for getting current selling book
  getMyCurrentSellingBook = () => {
    axios
      .post(this.props.api + "/search", {
        owner: this.props.user.username
      })
      .then(res => {
        this.setState({ currentSellingBook: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addInter = obj => {
    axios
      .post(this.props.api + "/putInterests", obj)
      .then(res => {
        if (!res.data.success) {
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  updatePassword = (oldPass, newPass) => {
    axios
      .post(this.props.api + "/changePassword", {
        username: this.props.user.username,
        password: oldPass,
        newPassword: newPass
      })
      .then(res => {
        if (res.data.success) alert("Password Update Successfully!");
        else alert("Incorrect Password!");
        this.props.signOut();
        return res.data;
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>
          Welcome {this.props.user.firstname + " " + this.props.user.lastname}
        </h1>
        <table style={{ textAlign: "center" }}>
          <tr>
            <th>Your username</th>
            <th>Your account email</th>
          </tr>
          <tr>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.email}</td>
          </tr>
        </table>
        <details>
          <summary>Change Password</summary>
          <label>
            Current Password:
            <input
              type="text"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder=""
              style={{ width: "200px" }}
            />
          </label>
          <label>
            New Password:
            <input
              type="text"
              onChange={e => this.setState({ newPassword: e.target.value })}
              placeholder=""
              style={{ width: "200px" }}
            />
          </label>
          <button
            onClick={() => {
              this.updatePassword(this.state.password, this.state.newPassword);
            }}
          >
            Update Password
          </button>
        </details>
        <hr />
        <h2 style={{ textAlign: "center" }}>Selects your interests of book:</h2>
        <div>
          <button
            style={{ margin: "5px" }}
            type="button"
            class={this.state.buttonClass}
            onClick={() => {
              this.addInter({
                course: "English",
                username: this.props.user.username
              });
              this.props.updateInter("English");
              this.props.randomBook();
            }}
          >
            English
          </button>
          <button
            style={{ margin: "5px" }}
            type="button"
            class={this.state.buttonClass}
            onClick={() => {
              this.addInter({
                course: "CSE",
                username: this.props.user.username
              });
              this.props.updateInter("CSE");
              this.props.randomBook();
            }}
          >
            CSE
          </button>
          <button
            style={{ margin: "5px" }}
            type="button"
            class={this.state.buttonClass}
            onClick={() => {
              this.addInter({
                course: "History",
                username: this.props.user.username
              });
              this.props.updateInter("History");
              this.props.randomBook();
            }}
          >
            History
          </button>

          <span />
        </div>
        <hr />
        <h2 style={{ textAlign: "center" }}>
          Here is the book you are currently selling
        </h2>
        <div>
          {this.state.currentSellingBook.map(book => (
            <BookCardInfo key={book._id} bookInfo={book} api={this.props.api} username={this.props.user.username} />
          ))}
        </div>
        <AddBook
          username={this.props.user.username}
          user={this.props.user}
          api={this.props.api}
        />{" "}
      </React.Fragment>
    );
  }
}

export default AccountPage;
