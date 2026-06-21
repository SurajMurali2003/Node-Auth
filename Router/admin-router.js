const express = require("express");
const AdminRouter = express.Router();
const authMiddleware = require("../Middleware/auth-middleware");
const adminRightsMiddleware = require("../Middleware/adminRights-middleware");

AdminRouter.get(
  "/welcome",
  authMiddleware,
  adminRightsMiddleware,
  (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Welcome to admin page",
        data: req.userInfo,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal sevrer error ${error.message}`,
      });
    }
  },
);

module.exports = AdminRouter;
