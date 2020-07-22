import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import FamilyMembers from "../family/FamilyMembers";
import FamilyInvite from "./FamilyInvite";

class FamilyMain extends Component {
  state = {
    family: undefined,
    description: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => {
        this.setState({ family: result.data });
        if (result !== false) {
          axios
            .get("/api/getfamily/description", {
              cancelToken: this.source.token,
            })
            .then((result) => this.setState({ description: result.data }));
        }
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/dashboard/family/invite" component={FamilyInvite} />
          <Route path="/dashboard/family/members" component={FamilyMembers} />
          <React.Fragment>
            <div id="familyContentWrapper">
              <div style={{ marginTop: 100 }}>
                <span className="familyTitle">Family:</span>
              </div>
              <div id="familyName">{this.state.family}</div>
              <div style={{ marginTop: 40 }}>
                <span className="familyHeader">Description:</span>
              </div>
              <div id="familyDescription">{this.state.description}</div>
            </div>
          </React.Fragment>
        </Switch>
      </React.Fragment>
    );
  }
}

export default FamilyMain;
