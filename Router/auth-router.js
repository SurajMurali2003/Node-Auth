const express = require("express");
const AuthRouter = express.Router();

const { registerUser, loginUser } = require("../Controller/auth");

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);

module.exports = AuthRouter;
