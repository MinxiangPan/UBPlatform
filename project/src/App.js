import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Body from "./components/body";
import Register from "./components/register";
import Login from "./components/login";
import Header from "./components/header";
import Footer from "./components/footer";
import axios from "axios";
import AddBook from "./components/addBook";
import Content from "./components/content";
import AccountPage from "./components/accountPage";
import { Alert } from "react-bootstrap";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    content: null,
    user: null,
    currentSellingBook: [],
    deleteByIdFromDB: null,
    search: null,
    book: [
      {
        title: "Harry Potter",
        price: "$2",
        course: "CSE442",
        url:
          "https://jamesclear.com/wp-content/uploads/2015/02/Harry-Potter-by-JK-Rowling-568x700.jpeg"
      },
      {
        title: "Harry Potter",
        price: "$20",
        course: "CSE442",
        url:
          "https://jamesclear.com/wp-content/uploads/2015/02/Harry-Potter-by-JK-Rowling-568x700.jpeg"
      }
    ]
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
      .then(result => {
        this.setState({
          content: (
            <Body
              data={this.state.data}
              deleteByIdFromDB={this.deleteByIdFromDB}
            />
          ),

          deleteByIdFromDB: this.deleteByIdFromDB,
          search: this.search
        });
      });

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

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  // # see this.state.data
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  loginformation = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  // # json = json object
  putDataToDB = json => {
    axios
      .post("http://localhost:3001/api/putData", json)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  putDataToUserDB = json => {
    axios
      .post("http://localhost:3001/api/putUser", json)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // to remove existing database information
  // # idTodelete = _id from database
  deleteByIdFromDB = idTodelete => {
    axios.delete("http://localhost:3001/api/deleteByIdData", {
      data: { id: idTodelete }
    });
  };

  //FIXME: This function has not complete yet, Dont run this
  // our update method that uses our backend api
  // to overwrite existing data base information
  //# idToUpdate = object ID
  //# updateToApply = JSON object that container information need for update
  updateDB = (idToUpdate, updateToApply) => {
    axios.post("http://localhost:3001/api/updateByIdData", {
      id: idToUpdate,
      update: updateToApply
    });
  };

  //Warning! This is use for test purpose, This will delete all data in database
  deleteAll = () => {
    this.state.data.forEach(dat => {
      axios.delete("http://localhost:3001/api/deleteByIdData", {
        data: {
          id: dat._id
        }
      });
    });
  };

  //This method allow to add multiple book at once
  // arrBook = array of JSON that contain book information (see dataschema for detail)
  addAll = arrBook => {
    arrBook.forEach(bok => {
      axios.post("http://localhost:3001/api/putData", bok);
    });
  };
  //This is change
  LogintoDB = json => {
    axios
      .post("http://localhost:3001/api/login", json)
      .then(res => {
        this.setState({ user: res.data.user });
        this.setAccountPage();
      })
      .catch(err => {
        console.log(err);
      });
  };

  search = obj => {
    axios
      .post("http://localhost:3001/api/search", obj)
      .then(res => {
        this.setHome(
          <Body data={res.data.data} deleteByIdFromDB={this.deleteByIdFromDB} />
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateData = datas => {
    this.setState({ data: datas });
  };
  setHome = obj => {
    this.setState({
      content: obj
    });
  };
  setLogin = () => {
    this.setState({ content: <Login LogintoDB={this.LogintoDB} /> });
  };
  setRegister = () => {
    this.setState({
      content: <Register putDataToUserDB={this.putDataToUserDB} />
    });
  };

  setAccountPage = () => {
    if (this.state.user == null) {
      return console.log("login first");
    }
    this.getMyCurrentSellingBook({ owner: this.state.user.username });
  };

  //new function for getting current selling book
  getMyCurrentSellingBook = obj => {
    axios
      .post("http://localhost:3001/api/search", obj)
      .then(res => {
        this.setState({ currentSellingBook: res.data.data });

        this.setState({
          content: (
            <AccountPage
              user={this.state.user}
              putDataToDB={this.putDataToDB}
              currentSellingBook={res.data.data}
              deleteByIdFromDB={this.state.deleteByIdFromDB}
            />
          )
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <React.Fragment>
        <Header
          state={this.state}
          setLogin={this.setLogin}
          setHome={this.setHome}
          setRegister={this.setRegister}

          setAccountPage={this.setAccountPage}
          putDataToDB={this.putDataToDB}
          search={this.search}
          state={this.state}
        />
        {this.state.content}

        <button onClick={() => this.getMyCurrentSellingBook({ owner: "Ying" })}>
          test
        </button>

        {/* <Register putDataToUserDB={this.putDataToUserDB} />
        <Login LogintoDB={this.LogintoDB} /> */}
        {/* <button onClick={this.deleteAll}>Delete All</button>
        <button onClick={() => this.addAll(this.state.book)}>Add All</button>
        <Body data={this.state.data} deleteByIdFromDB={this.deleteByIdFromDB} />
        <Footer /> */}
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
