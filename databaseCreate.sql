CREATE DATABASE Receiply;
CREATE TABLE Receiply.Accounts
(
    USER_ID varchar(36),
    EMAIL varchar(200),
    VERIFIED int,
    USERNAME varchar(200),
    PASS varchar(200),
    FIRST_NAME varchar(200),
    LAST_NAME varchar(200),
    FAMILY varchar(36),
    FAMILY_AUTH varchar(100),
    PRIVACY varchar(100)
);

CREATE TABLE Receiply.Recipes
(
    RECIPE_ID varchar(36),
    RECIPE_IDENTIFIER varchar(36),
    CREATOR_ID varchar(36),
    CREATOR_USERNAME varchar(200),
    FAMILY_ID varchar(36),
    DATE_CREATED date,
    TTM varchar(36),
    RECIPE_NAME varchar(200),
    DESCRIPTION varchar(2000),
    INGREDIENTS json,
    PREP_INSTRUCTIONS json,
    COOKING_INSTRUCTIONS json,
    TAGS json,
    PUBLISH_STATE varchar(50),
    PHOTO_NAME varchar(200),
    LIKES int
);

CREATE TABLE Receiply.Families
(
    FAMILY_ID varchar(36),
    FAMILY_IDENTIFIER varchar(5),
    FAMILY_NAME varchar(100),
    FAMILY_CREATED varchar(100),
    FAMILY_CREATOR varchar(200),
    DESCRIPTION text
);

CREATE TABLE Receiply.Likes
(
    LIKE_ID varchar(36),
    USER_ID varchar(36),
    LIKE_TYPE varchar(100),
    ITEM varchar(36)
);

CREATE TABLE Receiply.Comments
(
    COMMENT_ID varchar(36),
    RECIPE_ID varchar(36),
    COMMENTER varchar(36),
    COMMENT_CONTENT varchar(2000),
    COMMENT_DATE date,
    LIKES int
);

CREATE TABLE Receiply.Ingredients 
(
    RECIPE_ID varchar(36),
    INGREDIENT varchar(10000),
    STEP int
);

CREATE TABLE Receiply.Prep 
(
    RECIPE_ID varchar(36),
    PREP varchar(10000),
    STEP int
);

CREATE TABLE Receiply.Cooking_Instructions 
(
    RECIPE_ID varchar(36),
    COOKING_INSTRUCTION varchar(10000),
    STEP int
);

CREATE TABLE Receiply.Tags 
(
    RECIPE_ID varchar(36),
    TAG varchar(10000),
    STEP int
);