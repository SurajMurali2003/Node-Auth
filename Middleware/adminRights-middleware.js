function adminRightsMiddleware(req, res, next) {
  try {
    const { role } = req.userInfo;
    console.log("role", role);

    //Check the user is admin
    if (role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You dont have Admin Rights to acces this Page",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${error.message}`,
    });
  }
}

module.exports = adminRightsMiddleware;
