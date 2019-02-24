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

class Header extends Component {
  state = { input: null };

  render() {
    return (
      <Navbar bg="light" expand="lg" style={{ marginBottom: 10 }}>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="#home"
              onSelect={() => {
                console.log(this.props.state.funs);
                this.props.setHome(
                  <Body
                    data={this.props.state.data}
                    deleteByIdFromDB={this.props.state.deleteByIdFromDB}
                  />
                );
              }}
            >
              >Home
            </Nav.Link>
            <Nav.Link
              href="#accountPage"
              onSelect={() => {
                console.log(this.props.state.user);
                this.props.setAccountPage();
              }}
            >
              Account
            </Nav.Link>
          </Nav>
          <Form inline>
            <NavDropdown title="Filter" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => {
                  this.props.search({ course: "CSE" });
                }}
              >
                CSE
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => {
                  this.props.search({ course: "ENGLISH" });
                }}
              >
                English
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onClick={() => {
                  this.props.search({ course: "HISTORY" });
                }}
              >
                History
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Test</NavDropdown.Item> */}
            </NavDropdown>
            <input
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={e => {
                this.setState({ input: e.target.value });
              }}
            />
            <Button
              variant="outline-success"
              onClick={() => {
                this.props.search({ title: this.state.input });
              }}
            >
              Search
            </Button>
            <Button
              variant="outline-success"
              onClick={() => this.props.setLogin()}
            >
              Login
            </Button>
            <Button
              variant="outline-success"
              onClick={() => this.props.setRegister()}
            >
              Register
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
