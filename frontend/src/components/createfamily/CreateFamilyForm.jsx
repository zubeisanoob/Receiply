import React, { Component } from "react";
import NavbarMain from "../navbar/navbarmain";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from "axios";

import "./createfamily.css";

import FamilyChoice from "./FamilyChoice";

class CreateFamilyForm extends Component {
  state = {
    families: [],
    value: undefined,
    createName: "",
  };

  handleChange = (event) => {
    this.setState({ value: event });
  };

  handleInput = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleCreate = () => {
    const data = {
      family: [this.state.createName],
    };
    if (this.state.createName.length === 0) {
      console.log("One or more fields is empty");
    } else {
      axios.post("/api/addfamily", data);
    }
  };

  renderChoiceButton = () => {
    if (this.state.value === undefined) {
    } else {
      return (
        <span>
          <input
            className="createFamilyButton"
            type="button"
            value="Request to join"
          />
        </span>
      );
    }
  };

  renderChoice = () => {
    if (this.state.families.length == !0) {
      return (
        <React.Fragment>
          <div id="createFamIntro" className="createFamThinText">
            Here are some families we found for you
          </div>
          <ToggleButtonGroup
            id="familyChoiceOrder"
            type="radio"
            name="selectFamily"
            onChange={this.handleChange}
          >
            {this.state.families.map((item, index) => (
              <ToggleButton
                variant="light"
                className="createFamilyChoiceWrapper"
                key={item.FAMILY_CREATOR}
                value={index}
              >
                <FamilyChoice
                  family={item.FAMILY_NAME}
                  creator={`${item.FIRST_NAME} ${item.LAST_NAME}`}
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {this.renderChoiceButton()}
          <div id="createFamilyOR" className="createFamBoldText">
            OR
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div id="createFamilyOR" className="createFamBoldText">
          Search or create a family
        </div>
      );
    }
  };

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
    axios
      .get("/api/findfamily")
      .then((response) => this.setState({ families: response.data }));
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
  }

  render() {
    console.log(this.state.value);
    console.log(this.state.createName);
    return (
      <div id="createFam">
        <NavbarMain />
        <div id="createFamWrapper">
          <div>
            <div id="createFamContent">
              {this.renderChoice()}

              <div id="createFamilyBottom">
                <div>
                  <div className="createFamThinText">Search for family</div>
                  <input
                    className="createFamInput"
                    type="text"
                    placeholder="Search for family"
                  />
                  <div>
                    <input
                      id="createFamilyBottomButton"
                      className="createFamilyButton"
                      type="button"
                      value="Search"
                    />
                  </div>
                </div>
                <div id="createFamilyBottomSeperator"></div>
                <div>
                  <div className="createFamThinText">Create family</div>
                  <input
                    className="createFamInput"
                    type="text"
                    placeholder="Enter name of family"
                    value={this.state.createName}
                    onChange={this.handleInput("createName")}
                  />
                  <div>
                    <input
                      id="createFamilyBottomButton"
                      className="createFamilyButton"
                      type="button"
                      value="Create"
                      onClick={this.handleCreate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFamilyForm;
