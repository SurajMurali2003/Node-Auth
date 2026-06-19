const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //Get Auth token from headers
    const authHeaders = req.headers["authorization"];
    //  console.log("authHeaders", authHeaders);

    const token = authHeaders.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Access denied,You dont have Token.",
      });
    }

    //Decode the Token
    const deocodeTokenDetails = jwt.verify(token, "JSON_WEB_TOKEN");
    //  console.log("deocodeTokenDetails", deocodeTokenDetails);

    req.userInfo = deocodeTokenDetails;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: `Internal sevrer error ${error.message}`,
    });
  }
};

module.exports = authMiddleware;
