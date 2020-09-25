import React, { Component } from "react";
import axios from "axios";
import validator from "email-validator";
import "./signup.css";
import Navbar from "../navbar/navbar";

import { Redirect } from "react-router-dom";

class SignupForm extends Component {
  state = {
    email: "",
    first: "",
    last: "",
    user: "",
    pass: "",
    check1: "",
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  handleSubmit = () => {
    let data = {
      account: [
        this.state.email,
        this.state.first,
        this.state.last,
        this.state.user,
        this.state.pass,
      ],
    };
    if (
      this.state.email.length < 4 ||
      this.state.first.length === 0 ||
      this.state.last.length === 0 ||
      this.state.user.length === 0 ||
      this.state.pass.length === 0
    )
      return this.setState({ check1: "fieldMissing" });

    if (validator.validate(this.state.email) === false) {
      this.setState({ check1: "unvalidEmail" });
      console.log("Please enter a valid email address!");
    } else {
      axios
        .post("/api/user/create", data, {
          headers: {
            "Content-Type": "application/json",
            cancelToken: this.source.token,
          },
        })
        .then((result) => {
          this.setState({ check1: result.data });

          const datas = {
            account: [this.state.email, this.state.pass],
          };
          if (result.data === "badUser" || result.data === "badEmail") {
          } else {
            axios
              .post("/api/user/login", datas, {
                headers: {
                  "Content-Type": "application/json",
                  cancelToken: this.source.token,
                },
              })
              .then((response) => this.setState({ check2: response.data }));
          }
        });
    }
  };

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    if (this.state.check1 === true) {
      return (
        <React.Fragment>
          <Redirect to="/" />
        </React.Fragment>
      );
    }

    return (
      <div id="signupBody">
        <Navbar />
        <div id="signupFormWrapper">
          <div id="signupFormContainer">
            <div id="signupHeader">Signup</div>
            <div id="signupBar"></div>
            {this.state.check1 === "badUser" ? (
              <div id="loginError">User with that username already exists!</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check1 === "badEmail" ? (
              <div id="loginError">
                Account with email has already been created!
              </div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check1 === "unvalidEmail" ? (
              <div id="loginError">Please enter a valid email address</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check1 === "fieldMissing" ? (
              <div id="loginError">One or more fields is missing</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <div className="signupDescription">Email</div>
            <input
              type="text"
              className="signupInput"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
            <div className="signupDescription">First name</div>
            <input
              type="text"
              className="signupInput"
              placeholder="Enter first name"
              value={this.state.first}
              onChange={this.handleChange("first")}
            />
            <div className="signupDescription">Last name</div>
            <input
              type="text"
              className="signupInput"
              placeholder="Enter last name"
              value={this.state.last}
              onChange={this.handleChange("last")}
            />
            <div className="signupDescription">Username</div>
            <input
              type="text"
              className="signupInput"
              placeholder="Enter username"
              value={this.state.user}
              onChange={this.handleChange("user")}
            />
            <div className="signupDescription">Password</div>
            <input
              type="password"
              className="signupInput"
              placeholder="Enter password"
              value={this.state.pass}
              onChange={this.handleChange("pass")}
            />

            <div style={{ textAlign: "center" }}>
              <input
                type="button"
                value="Submit"
                id="signupSubmitButton"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
