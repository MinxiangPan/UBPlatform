import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class BookCardInfo extends Component {
  state = {
    id: this.props.bookInfo._id,
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="col-lg-2" style={{ display: "inline-table" }}>
        <div className="card">
          <div className="badge badge-dark">
            <img
              style={{ width: 300, height: "100%" }}
              src={this.props.bookInfo.url}
              alt="Logo"
            />
            <h5 className="card-title">
              Book Name: {this.props.bookInfo.title}
            </h5>
            <p className="card-text">Course: {this.props.bookInfo.course}</p>
            <p>Price: {this.props.bookInfo.price}</p>

            {/* <button
                onClick={() => {
                  this.props.deleteByIdFromDB(this.props.bookInfo._id);
                }}
              >
                Delete This Book
              </button> */}

            {/* <button onClick={this.openModal}>Open Modal</button> */}

            <button class="btn btn-primary" onClick={this.openModal.bind(this)}>
              More details
            </button>
            {console.log(this.props.username)}
            {this.props.username ? <button className="btn btn-primary" onClick={()=>{
              axios.delete(this.props.api + "/deleteByIdData", {
                data: { owner: this.props.username, id: this.props.bookInfo._id }
              });
            }}>Delete</button> : null}
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
            >
              <ModalHeader> Book Details </ModalHeader>
              <ModalBody>
                <div>Book Author: </div>
                <h5> Junjie Chen</h5>

                <div>Book edition: </div>
                <h5> Third edition</h5>

                <div>Book Owner: </div>
                <h5> {this.props.bookInfo.owner}</h5>

                <div>Book contact Info: </div>
                <h5> yzou8@buffalo.edu</h5>

                <div>Book Price: </div>
                <h5> {this.props.bookInfo.price}</h5>
                <div>Book Descrption: </div>
                <h5>
                  {" "}
                  Features: 200 hard puzzles Big grids for easy solving
                  Introduction by legendary puzzlemaster Will Shortz
                </h5>
              </ModalBody>
              <ModalFooter>
                <button class="btn btn-primary" onClick={this.closeModal}>
                  close
                </button>
              </ModalFooter>
            </Modal>
          </div>
        </div>

        {/* <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target=".bd-example-modal-sm"
        >
          Small modal
        </button>
        <Modal isOpen={false}>
          <ModalHeader> Modal Title </ModalHeader>
        </Modal> */}
      </div>
    );
  }
}

export default BookCardInfo;
