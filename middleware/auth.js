const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("authorization") ? req.header("authorization").split(" ")[1] : null;
  
  if(!token) {
    return res.status(401).json({ message: "Authorization Required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded._id;
    req.userName = decoded.name
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token"})
  }
}