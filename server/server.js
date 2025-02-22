const express = require("express");
const app = express();
const AccountHandlers = require("./modules/AccountHandlers");
const GetInfo = require("./modules/GetInfo");
const FamilyHandlers = require("./modules/FamilyHandlers");
const InviteHandlers = require("./modules/InviteHandlers");
const RecipeHandlers = require("./modules/RecipeHandlers");
const SearchHandlers = require("./modules/SearchHandlers");
const LikeHandlers = require("./modules/LikeHandlers");
const CommentHandlers = require("./modules/CommentHandlers");
const EditHandlers = require("./modules/EditHandlers");
const SettingsHandler = require("./modules/SettingsHandler");
const VerifyHandler = require("./modules/VerifyHandlers");
const bodyParser = require("body-parser");
const PORT = 8080;
const os = require("os");
const HOSTNAME = os.hostname();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(AccountHandlers);
app.use(GetInfo);
app.use(FamilyHandlers);
app.use(RecipeHandlers);
app.use(InviteHandlers);
app.use(LikeHandlers);
app.use(SearchHandlers);
app.use(CommentHandlers);
app.use(EditHandlers);
app.use(SettingsHandler);
app.use(VerifyHandler);
app.use("/uploads", express.static("uploads"));

/*
app.use(express.static(path.join(__dirname, "", "build")));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "", "build", "index.html"));
});
*/
app.listen(PORT, () => {
  console.log(`Server started on ${HOSTNAME} port ${PORT}`);
});
