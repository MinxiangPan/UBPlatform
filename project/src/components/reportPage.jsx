import React, { Component } from "react";
import axios from "axios";

class reportPage extends Component {
  state ={
    seller: null,
    email: null,
    book: null,
    reason: null
  };

  reportSend = () => {
    if(this.state.seller && this.state.email && this.state.book && this.state.reason){
      axios.post(this.props.api + "/report", {seller :this.state.seller, email: this.state.email, book:this.state.book, reason:this.state.reason})
      .then(res => {res.data.success ? alert("Report Sent!") : alert("Your need to fill up all the require fields.");})
      .catch(err => alert("!error!"));
    }
    else {
      alert("You need to fill up the all the require fields.");
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}> Report Someone</h1> <br />
        <form
          style={{ textAlign: "center" }}
          action=""
        >
          <label>
            Seller Username:
            <input type="text" name="sellerName" onChange={(e)=> {this.setState({seller: e.target.value})}}/>
          </label>
          <br />
          <label>
            Seller Email:
            <input type="text" name="sellerEmail" onChange={(e)=> {this.setState({email: e.target.value})}}/>
          </label>
          <br />

          <label>
            Book Name:
            <input type="text" name="bookName" onChange={(e)=> {this.setState({book: e.target.value})}} />
          </label>
          <br />
          <label>
            Reason of report:
            <br />
            <textarea rows="4" cols="50" name="comment" form="usrform" onChange={(e)=> {this.setState({reason: e.target.value})}}/>
          </label>
          <br />

          <input type="submit" value="Submit" onClick={()=>{this.reportSend()}}/>
        </form>
      </React.Fragment>
    );
  }
}

export default reportPage;
