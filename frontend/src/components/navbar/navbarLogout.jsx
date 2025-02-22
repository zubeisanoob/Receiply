import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

import { Redirect } from "react-router-dom";

class NavbarLogout extends Component {
  state = {
    active: false,
    logout: undefined,
  };

  handleLogout = () => {
    axios
      .get("/api/user/logout")
      .then((res) => this.setState({ logout: res.data }));
  };

  render() {
    if (this.state.logout === true) {
      return <Redirect to="/login" />;
    } else {
      return (
        <React.Fragment>
          <button id="logout" onClick={() => this.setState({ active: true })}>
            <span className="navitem accountitems">Logout</span>
          </button>
          <Modal
            show={this.state.active}
            onHide={() => this.setState({ active: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: "flex", gap: 15 }}>
                <button id="logout" onClick={this.handleLogout}>
                  <span className="navitem accountitems">Logout</span>
                </button>
                <button
                  id="logout"
                  onClick={() => this.setState({ active: false })}
                >
                  <span
                    className="navitem accountitems"
                    style={{ backgroundColor: "#D5D5D5" }}
                  >
                    Cancel
                  </span>
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      );
    }
  }
}

export default NavbarLogout;
