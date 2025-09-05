const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.js");

authRouter.post("/myMusic/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            res.status(400).send({ ERROR: "User email is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hash, name });
        await newUser.save();
        res.status(200).send({ message: "User created successfully" });
    } catch (err) {
        console.log("ERROR: ", err)
        res.status(400).send({ ERROR: "Some error has occured, Fill all required and valid data" });
    }
})

authRouter.post("/myMusic/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send({ ERROR: "Invalid email or password" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send({ ERROR: "Invalid email or password" });
        }
        const token = user.getjwt();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        })
        res.status(200).send({
            message: "Logged in successfully",
            user: { name: user.name, email: user.email, _id: user._id, type: user.type }
        });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured, Fill all required and valid data" });
    }
})

authRouter.post("/myMusic/auth/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expiresIn: new Date(Date.now()) });
        res.status(200).send({ message: "Logged out successfully" });
    } catch (err) {
        console.log("ERROR: ", err)
    }
});

authRouter.patch("/myMusic/auth/changePassword", async (req, res) => {
    const { newPassword, confirmPassword, email } = req.body;
    try {
        if (!newPassword || !confirmPassword || !email) {
            res.status(400).send({ ERROR: "Please provide New Password and Confirm Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).send({ ERROR: "Please enter correct email" });
        }
        user.password = hash;
        await user.save();
        res.status(200).send({ message: "Password changed successfully" });
    }
    catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }

})
module.exports = { authRouter }