const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
        unique: true
    },
    albumName: {
        type: String,
        required: true
    }
});

const Song = mongoose.model("Song", songSchema, "songs");

module.exports = { Song };
