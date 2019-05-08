import React, { Component } from "react";
import BookCardInfo from "./bookCardInfo";
import axios from "axios";
import AccountPage from "./accountPage";
import "../App.css";
class InterestsPage extends Component {
  state = {
    data: [],
    intervalIsSet: null
  };

  getDataFromDb = obj => {
    axios
      .post(this.props.api + "/guessYouLike", obj)
      .then(res => {
        this.state.data[0] = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  };
  returnstyle = () => {
    if (this.props.randomBook.length == 0) {
      return {
        marginTop: "20%",
        marginBottom: "20%",
        textAlign: "center",
        fontSize: "50px"
      };
    }
    return {
      marginTop: "5%",
      marginBottom: "5%",
      textAlign: "center",
      fontSize: "30px"
    };
  };

  remind = () => {
    if (this.props.randomBook.length == 0) {
      return "You don't have one interest of book selected ";
    }
    return "You may like these books...";
  };

  render() {
    return (
      <div class="body">
        <div style={this.returnstyle()}>{this.remind()}</div>
        {this.props.randomBook.map(book => (
          <BookCardInfo key={book._id} bookInfo={book} />
        ))}
      </div>
    );
  }
}
export default InterestsPage;
