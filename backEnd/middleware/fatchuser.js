const jwt = require("jsonwebtoken");
const JWT_SECRET = "Dhrup@l";
//  JWT_SECRET=process.env.JWT_SECRET;


const fatchuser = (req, res, next) => {
  //get the user the user from jwt token and add the req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      error: "Please authenticate yourself with valid token ",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Please authenticate yourself with valid token ",
    });
  }
};

module.exports = fatchuser;
