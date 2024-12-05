const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("Token is null");
    return res
      .status(401)
      .json({ status: "Failed", message: "No token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: "Failed", message: "Token is not valid" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
