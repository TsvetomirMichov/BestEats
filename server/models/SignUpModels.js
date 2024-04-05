const mongoose = require('mongoose');
const bcript = require('bcryptjs')
var validatorPackage = require("validator");

const User = new mongoose.Schema(
    {
        //THe unique create a index in MongoDb and it only create a unique emails that dont dublicate 
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            validate: {
                validator: validatorPackage.isEmail,
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: 6,
            maxlength: 50
        },
        phone: {
            type: Number,
            required: [true, "phone is required"],
            minlength: 8,
            maxlength: 9,
        },
        role: {
            type: String,
        }
    }
)
// Salt add 32 or more bits to the password before is hashed
// .pre means before saving to the password is added a salt and its hashed before saving to the DB
User.pre('save', async function (next) {
    const salt = await bcript.genSalt(10)
    this.password = await bcript.hash(this.password, salt)
    next()
})

User.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcript.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error("Invalid password")
    }
    throw Error("Invalid user")
}
// Importing the model 
const UserData = mongoose.model('User-data', User)

module.exports = UserData