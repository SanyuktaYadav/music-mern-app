const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/user.js");
const { userAuth } = require("../middleware/auth.js");

userRouter.post("/myMusic/users/all", userAuth, async (req, res) => {
    try {
        const { name } = req.body;
        let users;
        if (name) {
            users = await User.find({ name }).collation({ locale: 'en', strength: 2 });
        } else {
            users = await User.find();
        }
        res.status(200).send({ message: "Users fetched successfully", users, totalCount: users.length });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

module.exports = { userRouter }