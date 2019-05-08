import React, { Component } from "react";
import AddBook from "./addBook";
import BookCardInfo from "./bookCardInfo";
import axios from "axios";
import "./accountPage.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <div class="body">
          <div style={{ left: "50%" }}>
            <h1 class="center-text" style={{ fontSize: "50px" }}>
              {this.props.user.username}'s Profile
            </h1>
          </div>
          <img
            // class={"img-box-user p-0"}
            src={require("./images/default-profile.png")}
            alt={""}
            style={{
              marginLeft: "45%",
              height: "10%",
              width: "10%",
              display: "block"
            }}
          />

          <div style={{ textAlign: "center", fontSize: "30px" }}>
            {this.props.user.firstname} {this.props.user.lastname}
          </div>
          {/* <th>account email</th> */}

          <details class="center-text">
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
                this.updatePassword(
                  this.state.password,
                  this.state.newPassword
                );
              }}
            >
              Update Password
            </button>
          </details>
          <div class="center-button" style={{ marginTop: "2%" }}>
            <button class="btn btn-primary" onClick={this.openModal.bind(this)}>
              addbook
            </button>
          </div>

          <hr class="line" />
          <h2 style={{ textAlign: "center" }}>
            Selects your interests of book:
          </h2>
          <div class="center-button">
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
          <hr class="line" />
          <h2 style={{ textAlign: "center" }}>Your Book Shop</h2>

          <div>
            {this.state.currentSellingBook.map(book => (
              <BookCardInfo key={book._id} bookInfo={book} api={this.props.api} username={this.props.user.username} />
            ))}
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <ModalHeader> Book Details </ModalHeader>
            <ModalBody>
              <AddBook
                username={this.props.user.username}
                user={this.props.user}
                api={this.props.api}
                closeModal={this.closeModal}
              />
            </ModalBody>
            <ModalFooter>
              <button class="btn btn-light" onClick={this.closeModal}>
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default AccountPage;
