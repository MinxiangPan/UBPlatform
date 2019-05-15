import React, { Component } from "react";
import StickyHeader from "react-headroom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import AccountPage from "./accountPage";
import Body from "./body";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import BookCardInfo from "./bookCardInfo";
import InterestsPage from "./interestsPage";
import { setTimeout } from "timers";
import ReportPage from "./reportPage";
import Cookies from 'universal-cookie';

import Demo from "./Demo";
import logo1 from "./images/logo1.png";
// import logo2 from "../logo2.png";
// import logo3 from "../logo3.png";
// import logo4 from "../logo4.png";

const cookies = new Cookies();

class Header extends Component {
  state = {
    input: null,
    user: null,
    topRight: null,
    randomBook: [],
    currInterests: []
  };

  componentDidMount() {
    this.setTopRight(
      <React.Fragment>
        <Button
          style={{ margin: "5px" }}
          variant="outline-primary"
          onClick={() =>
            this.props.setContent(
              <Login
                setContent={this.props.setContent}
                login={this.login}
                api={this.props.api}
              />
            )
          }
        >
          Login
        </Button>
        <Button
          style={{ margin: "5px" }}
          variant="outline-primary"
          onClick={() =>
            this.props.setContent(
              <Register login={this.login} api={this.props.api} setContent={this.props.setContent}/>
            )
          }
        >
          Register
        </Button>
      </React.Fragment>
    );
    this.setState({user: cookies.get('users')});
  }

  setTopRight = content => {
    this.setState({
      topRight: content
    });
  };

  login = users => {
    if (users == null) {
      this.props.setContent(
        <Login
          setContent={this.props.setContent}
          login={this.login}
          api={this.props.api}
        />
      );
      return 0;
    }

    this.setState({ user: users, currInterests: users.interestsList });
    this.randomBook();
    cookies.set('users', users, {path : '/'});
    this.props.setContent(
      <AccountPage
        user={users}
        api={this.props.api}
        signOut={this.signOut}
        updateInter={this.updateInter}
        randomBook={this.randomBook}
      />
    );
    this.setTopRight(
      <Button
        style={{ margin: "5px" }}
        variant="outline-primary"
        onClick={() => this.signOut()}
      >
        Sign Out
      </Button>
    );
    return 1;
  };

  signOut = () => {
    this.props.setContent(<Body api={this.props.api} />);
    this.setState({ user: null, currInterests: [], randomBook: [] });
    cookies.remove('users');
    this.setTopRight(
      <React.Fragment>
        <Button
          style={{ margin: "5px" }}
          variant="outline-primary"
          onClick={() =>
            this.props.setContent(
              <Login
                setContent={this.props.setContent}
                login={this.login}
                api={this.props.api}
              />
            )
          }
        >
          Login
        </Button>
        <Button
          style={{ margin: "5px" }}
          variant="outline-primary"
          onClick={() =>
            this.props.setContent(
              <Register login={this.login} api={this.props.api} setContent={this.props.setContent}/>
            )
          }
        >
          Register
        </Button>
      </React.Fragment>
    );
  };

  //display random books using current user interests
  randomBook = () => {
    if (this.state.user == null) {
      return false; //error?
    } else {
      let interList = this.state.currInterests;
      let localRandomBook = [];
      let localTime = 0;
      var api = this.props.api;
      for (let i = 0; i < interList.length; i++) {
        setTimeout(function() {
          axios
            .post(api + "/search", { course: interList[i] })
            .then(res => {
              localTime = res.data.data.length;
              if (res.data.data.legnth == 1) {
                localRandomBook.push(res.data.data[0]);
              } else {
                let random1 = Math.floor(
                  Math.random() * Math.floor(res.data.data.length)
                );
                let random2 = Math.floor(
                  Math.random() * Math.floor(res.data.data.length)
                );
                while (random2 == random1) {
                  random2 = Math.floor(
                    Math.random() * Math.floor(res.data.data.length)
                  );
                }
                localRandomBook.push(res.data.data[random1]);
                localRandomBook.push(res.data.data[random2]);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }, localTime);
      }

      //after for loop
      this.setState({ randomBook: localRandomBook });
    }
  };

  updateInter = obj => {
    let tempInter = this.state.currInterests;
    if (!tempInter.includes(obj)) {
      tempInter.push(obj);
    }
    for (let i = 0; i < tempInter.length; i++) {
    }
    this.setState({ currInterests: tempInter });
  };

  render() {
    return (
      <Navbar
        bg="navbar navbar-dark bg-dark"
        expand="lg"
        style={{ marginBottom: 10 }}
      >
        <Navbar.Brand href="#home">
          UB Platform
          <img
            src="https://img.icons8.com/doodle/48/000000/books.png"
            style={{ width: 30 }}
          />
        </Navbar.Brand>
e2
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="#home"
              onSelect={() => {
                this.props.setContent(<Body api={this.props.api} />);
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#accountPage"
              onSelect={() => {
                this.login(this.state.user);
              }}
            >
              Account
            </Nav.Link>

            <Nav.Link
              href="#reportPage"
              onSelect={() => {
                this.props.setContent(<ReportPage api={this.props.api} setContent={this.props.setContent}/>);
              }}
            >
              Report
            </Nav.Link>
            <Nav.Link
              href="#InterestsPage"
              onSelect={() => {
                //this.randomBook();
                //this.updateInterPage();
                this.props.setContent(
                  <InterestsPage
                    api={this.props.api}
                    randomBook={this.state.randomBook}
                  />
                );
              }}
            >
              InterestsPage
            </Nav.Link>
            <Nav.Link
              href="#demo"
              onSelect={() => {
                this.props.setContent(<Demo />);
              }}
            >
              Demo
            </Nav.Link>
          </Nav>
          <Form inline>{this.state.topRight}</Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
