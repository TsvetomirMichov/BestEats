const UserData = require("../models/SignUpModels")
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const duplicate = await UserData.find({ name, email, password, phone })

        if (duplicate) res.status(404).json({ message: " duplicate" })

        const user = await UserData.create({ name, email, password, phone, role })

        res.status(201).json({ userCreated: user })

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
            { _id: user._id, name: user.name, role: user.role ,phone:user.phone},
            process.env.ACCESS_TOKEN,
            { expiresIn: '10m' })

        const refreshToken = jwt.sign(
            { _id: user._id, name: user.name, role: user.role , phone: user.phone},
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
                    return res.status(403).json({ message: 'No tokne found' })
                }
                else {
                    const foundUser = await UserData.findById(decodedToken._id);
                    if (foundUser) {
                        const accessToken = jwt.sign(
                            { _id: foundUser._id, name: foundUser.name, role: foundUser.role },
                            process.env.REFRESH_TOKEN,
                            { expiresIn: '1h' }
                        )
                        return res.json({ accessToken })
                    }
                    else {
                        return res.status(400).json({ respose: "no user found" });
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
        res.status(201).json(users
)

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    const { id } = req.body;

    try {
        // const deletedOrder = await OrderModule.findByIdAndDelete(id)
        // console.log(({ deleted: "deleted todo", order: deletedOrder }));
     let updatedUser= await UserData.updateOne(
        { "_id": id}, // Filter
        {$set: {"role": "Admin"}}, // Update
        {upsert: true} // add document with req.body._id if not exists 

   )
   res.status(200).json({"updated":updatedUser})

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