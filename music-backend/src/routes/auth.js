const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

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
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordCorrect) {
            res.status(400).send({ ERROR: "Invalid email or password" });
        }
        res.status(200).send({ message: "Logged in successfully", name: user.name, email: user.email });
    } catch (err) {
        console.log("ERROR: ", err)
    }
})

authRouter.post("/myMusic/auth/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.status(200).send({ message: "Logged out successfully" });
    } catch (err) {
        console.log("ERROR: ", err)
    }
});

module.exports = { authRouter }