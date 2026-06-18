const express = require("express");
const app = express();
const connectToDB = require("./DataBase/db.js");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const AuthRouter = require("./Router/auth-router.js");

//Connect to  DB
connectToDB();

// Middleware to use json
app.use(express.json());

// Mapping to Route
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
