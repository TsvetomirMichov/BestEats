require('dotenv').config();
const UserData = require("../models/SignUpModels");
const jwt = require("jsonwebtoken")

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  } else {
    jwt.verify(token
      ,
      process.env.REFRESH_TOKEN, async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
        }
        else {
          const user = await UserData.findById(decodedToken._id);
          if (user.role === "Admin") {
            next()
          }
        }
      }
    )
  }
}