const UserData = require("../models/SignUpModels")
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const duplicate = await UserData.findOne({ email })

        if (duplicate) {
            res.status(404) 
            throw new Error("User already exists")
        }
        const user = await UserData.create({ name, email, password, phone, role })
        if (user) {
            res.status(201).json({ message: "Registration successful" });
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserData.login(email, password)
        // const accessToken  = CreateToken(user)

        const accessToken = jwt.sign(
            { _id: user._id, name: user.name, role: user.role, phone: user.phone },
            process.env.ACCESS_TOKEN,
            { expiresIn: '10m' })

        const refreshToken = jwt.sign(
            { _id: user._id, name: user.name, role: user.role, phone: user.phone },
            process.env.REFRESH_TOKEN,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        }).status(200).json({ accessToken });

    } catch (error) {
        console.log(error)
    }
}

module.exports.loguout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports.refresh = (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token,
            process.env.REFRESH_TOKEN,
            async (err, decodedToken) => {
                if (err) {
                    return res.status(403).json({ message: 'No token found' })
                }
                else {
                    const foundUser = await UserData.findById(decodedToken._id);
                    if (foundUser) {
                        const accessToken = jwt.sign(
                            { _id: foundUser._id, name: foundUser.name, role: foundUser.role, phone: foundUser.phone },
                            process.env.REFRESH_TOKEN,
                            { expiresIn: '1h' }
                        )
                        return res.json({ accessToken })
                    }
                    else {
                        return res.status(400).json({ respose: "No user found" });
                    }
                }
            }
        )
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserData.find();
        res.status(201).json(users)

    } catch (error) {
        console.log(error);
    }
}

module.exports.getSingleUser = async (req, res, next) => {
    const { name } = req.query; // Use req.query to access the query parameters

    try {
        const currentUser = await UserData.findOne({ name }); // Use an object to match the field
        if (currentUser) {
            res.status(200).json({
                    id: currentUser._id,
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    role: currentUser.role
                });
        } else {
            res.status(404).json({ response: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.updateUser = async (req, res, next) => {
    const { id } = req.body;

    try {
        let updatedUser = await UserData.updateOne(
            { "_id": id }, // Filter
            { $set: { "role": "Admin" } }, // Update
            { upsert: true } // add document with req.body._id if not exists 

        )
        res.status(200).json({ "updated": updatedUser })

    } catch (err) {
        res.status(422).json({ failed: "failed to update" })
    }
}

module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.body;

    try {
        const deletedUser = await UserData.findByIdAndDelete(id)
        if (deletedUser) {
            res.status(200).json({ "Deleted successfully": deletedUser });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (err) {
        console.log(err);
    }
}