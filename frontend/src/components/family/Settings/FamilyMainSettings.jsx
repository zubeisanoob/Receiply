import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

class FamilyMainSettings extends Component {
  state = {
    modalType: undefined,
    modal: false,
    family: undefined,
    description: "",
    response: undefined,
  };

  componentDidMount() {
    axios.get("/api/family").then((res) => this.setState({ family: res.data }));
  }

  handleModalContent = () => {
    switch (this.state.modalType) {
      case "description":
        return (
          <div>
            {this.state.response === true ? (
              window.location.reload(false)
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <textarea
              defaultValue={this.state.family.DESCRIPTION}
              className="settingsInput"
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
              style={{ display: "block", width: 400 }}
            ></textarea>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/family/description", {
                      description: this.state.description,
                    })
                    .then((res) => this.setState({ response: res.data }))
                }
              >
                Update description
              </button>
              <button
                className="settingsItemButton settingsItemCancel"
                onClick={() => this.setState({ modal: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      default:
        return <div>Error</div>;
    }
  };
  render() {
    return (
      <div>
        <Modal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.handleModalContent()}</Modal.Body>
        </Modal>
        <div className="settingsItemWrapper">
          <div>
            <span className="settingsHeader">Family description </span>
          </div>
          <button
            className="settingsItemButton"
            onClick={() =>
              this.setState({ modal: true, modalType: "description" })
            }
          >
            Edit description
          </button>
        </div>
      </div>
    );
  }
}

export default FamilyMainSettings;
