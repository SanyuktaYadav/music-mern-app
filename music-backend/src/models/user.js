const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "listener",
    }
});

userSchema.methods.getjwt = function () {
    // const user = this;
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: "1d" });
    return token;
}

const User = mongoose.model("User", userSchema, 'users');

module.exports = { User };