const UserData = require("../models/SignUpModels");
const jwt = require("jsonwebtoken")

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token
            ,
            "secret123", async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                }
                else {
                    const user = await UserData.findById(decodedToken._id);
                    if (user.role ==="Admin") {
                        next()
                    }
                }
            }
        )
    }
}
