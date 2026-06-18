const User = require("../Model/login-auth.js");

const registerUser = async (req, res) => {
  try {
    //get user detials from Payload
    console.log("Reqqqqqqqq", req.body);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
const loginUser = async (req, res) => {};

module.exports = { registerUser, loginUser };
