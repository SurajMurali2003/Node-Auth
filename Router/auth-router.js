const express = require("express");
const AuthRouter = express.Router();
const authMiddleware = require("../Middleware/auth-middleware");

const { registerUser, loginUser, changePassword } = require("../Controller/auth");

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.put("/edit-pswd", authMiddleware, changePassword);

module.exports = AuthRouter;
