const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status("400").send("Please login or register");
        }

        const decodedObj = jwt.verify(token, "jwt_key_temp_1");
        const { _id } = decodedObj;

        const user = await User.findById(_id);

        if (!user) {
            res.status(400).send({ message: "User Not Found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(401).send({ message: "Please Login, Some error has occured" });
    }
}

module.exports = { userAuth }