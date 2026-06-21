const express = require("express");
const app = express();
const connectToDB = require("./DataBase/db.js");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const AuthRouter = require("./Router/auth-router.js");
const HomeRouter = require("./Router/home-router.js");
const AdminRouter = require("./Router/admin-router.js");
const ImageRouter = require("./Router/image-router.js");

//Connect to  DB
connectToDB();

// Middleware to use json
app.use(express.json());

// Mapping to Route
app.use("/api/auth", AuthRouter);
app.use("/api/home", HomeRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/file", ImageRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
