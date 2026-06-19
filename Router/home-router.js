const express = require("express");
const homeRouter = express.Router();
const authMiddleware = require("../Middleware/auth-middleware.js");

//Protecting thid routes with authMiddleware
//authMiddleware middlware funtion  that exectues before route logic
homeRouter.get("/welcome", authMiddleware, (req, res) => {
  console.log("reqq", req.userInfo);
  const { _id, username, email, role } = req?.userInfo;

  try {
    res.status(200).json({
      success: true,
      message: "Welcome to Home Page",
      data: {
        _id,
        username,
        email,
        role,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: true,
      message: `Internal server Error ${error.message}`,
    });
  }
});

module.exports = homeRouter;
