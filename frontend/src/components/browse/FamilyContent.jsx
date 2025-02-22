import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { family_recipes } from "../../actions/actions";
import axios from "axios";
import SearchItem from "../search/SearchItem";

class FamilyContent extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/recipes/family")
      .then((data) => this.props.write_family_recipes(data.data));
  }

  viewMoreVisible = () => {
    if (window.location.pathname.includes("/browse/family") === false) {
      return (
        <div className="browserMoreWrapper">
          <Link to="/browse/family" className="browseMore">
            View more
          </Link>
        </div>
      );
    }
  };

  render() {
    if (
      this.props.family_recipes !== false &&
      this.props.family_recipes !== "BadRecipe"
    ) {
      return (
        <div style={{ marginBottom: 50 }}>
          <div className="browseHeader">Family recipes</div>
          <div id="familyContent" className="contentOutline">
            {this.props.family_recipes
              .splice(this.props.splice1, this.props.splice2)
              .map((item) => {
                return (
                  <Link
                    to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                    key={item.RECIPE_ID}
                    className="recipeCardLink"
                  >
                    <SearchItem
                      title={item.RECIPE_NAME}
                      image={item.PHOTO_NAME}
                      description={item.DESCRIPTION}
                      likes={item.LIKES}
                    />
                  </Link>
                );
              })}
          </div>
          {this.viewMoreVisible()}
        </div>
      );
    } else if (this.props.family_recipes === false) {
      return (
        <div id="myrecipeNoneWrapper">
          <div id="myrecipeText">You are not apart of a family</div>
          <Link to="/family" id="myrecipeUploadButton">
            Join family
          </Link>
        </div>
      );
    } else {
      return (
        <div id="myrecipeNoneWrapper">
          <div id="myrecipeText">You don't have any family recipes</div>
          <Link to="/upload" id="myrecipeUploadButton">
            Create recipe
          </Link>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_family_recipes: (data) => dispatch(family_recipes(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    family_recipes: state.family_recipes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyContent);
