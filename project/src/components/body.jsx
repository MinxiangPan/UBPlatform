import React, { Component } from "react";
import BookCardInfo from "./bookCardInfo";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PageButton from "./pageButton";

class Body extends Component {
  state = {
    data: [],
    intervalIsSet: null,
    display: [],
    pages: [],
    itemIndex: 0,
    pageCount: 1,
    pageSize: 8,
    input: "",
    searchType: "title"
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    //Need better implementation for this in case of slow internet connection

    setTimeout(() => {
      this.setState({ display: this.state.data,
        pages: this.getArray(this.state.data, 0,this.state.pageSize < this.state.data.length ? this.state.pageSize : this.state.data.length),
        totalPage: Math.ceil(this.state.data.length / this.state.pageSize) });
    }, 500);

    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
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

  // our first get method that uses our backend api to
  // fetch data from our data base
  // # see this.state.data

  getDataFromDb = () => {
    fetch(this.props.api + "/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // to remove existing database information
  // # idTodelete = _id from database
  deleteByIdFromDB = idTodelete => {
    axios.delete(this.props.api + "/deleteByIdData", {
      data: { id: idTodelete }
    });
  };

  search = (type, input) => {
    var books = [];
    this.state.data.map(book => {
      if (book[type] && book[type].toLowerCase().includes(input.toLowerCase()))
        books.push(book);
    });
    this.setState({ display: books, 
      pages: this.getArray(books, 0, (this.state.pageSize < books.length ? this.state.pageSize : books.length)),
      itemIndex: 0,
      pageCount: 1,
      totalPage: Math.ceil(books.length / this.state.pageSize) });
  }

  pageButton = (books, amount) =>{
    if (amount < 0 && this.state.itemIndex > 0) {
      var postIndex = (this.state.itemIndex + amount) < this.state.pageSize ? 0 : (this.state.itemIndex + amount);
      var postBooks = (postIndex < this.state.pageSize) ? this.state.pageSize : this.state.itemIndex;
      this.setState({pages: this.getArray(books, postIndex, postBooks),
        itemIndex: postIndex,
        pageCount: this.state.pageCount - 1
      });  
    }
    else if (amount > 0 && this.state.itemIndex + amount < books.length){
      var postIndex = this.state.itemIndex + amount;
      var postBooks = (postIndex+this.state.pageSize) < books.length ? postIndex + this.state.pageSize : books.length;
      this.setState({
        pages: this.getArray(books, postIndex, postBooks),
        itemIndex: postIndex,
        pageCount: this.state.pageCount + 1
        });  
    }
  };

  getArray = (books, start, end) =>{
    var list = [];
    for(var i=0; i<books.length; i++){
      if (i >= start && i < end){
        list.push(books[i]);
      }
    }
    return list;
  }

  resetSearch = () =>{
    this.setState({ display: this.state.data, 
      pages: this.getArray(this.state.data,0, (this.state.pageSize < this.state.data.length ? this.state.pageSize : this.state.data.length)),
      itemIndex: 0,
      pageCount: 1,
      input: "",
      totalPage: Math.ceil(this.state.data.length / this.state.pageSize) });
    document.getElementById("searchInput").value = "";
  }

  render() {
    return (
      <div>
        <div style={{ paddingLeft: "38%" }}>
          <NavDropdown title={this.state.searchType} id="basic-nav-dropdown">
            <NavDropdown.Item
              href="#action/3.1"
              onClick={() => {
                this.setState({ searchType: "title" });
                this.resetSearch();
              }}
            >
              title
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#action/3.2"
              onClick={() => {
                this.setState({ searchType: "course" });
                this.resetSearch();
              }}
            >
              course
            </NavDropdown.Item>
          </NavDropdown>
          <input
            style={{width: "45%"}}
            type="text"
            id="searchInput"
            placeholder="Search"
            className="mr-sm-2"
            onChange={e => {
              this.search(this.state.searchType, e.target.value);
            }}
          />
          <Button
            style={{ margin: "5px" }}
            variant="outline-primary"
            onClick={() => {
              this.resetSearch();
            }}
          >
            Reset
          </Button>
        </div>
        <hr/>

        <div>
          {this.state.pages.map(book => (
            <BookCardInfo key={book._id} bookInfo={book} api={this.props.api} />
          ))}
        </div>
        <hr />
        <div style={{ margin: "5px", marginLeft: "38%" }}>
          <Button
            style={{ margin: "5px" }}
            onClick={() => {
              this.pageButton(this.state.display, -(this.state.pageSize));
            }}
          >
            Previous Page
          </Button>
          <h1 style={{ display:  "inline"}}>Page: {this.state.pageCount}</h1>
          <Button
            style={{ margin: "5px" }}
            onClick={() => {
              this.pageButton(this.state.display, this.state.pageSize);
            }}
          >
            Next Page
          </Button>
        </div>
      </div>
    );
  }
}

export default Body;
