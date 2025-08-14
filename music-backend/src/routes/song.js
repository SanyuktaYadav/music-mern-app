const express = require("express");
const songRouter = express.Router();
const { Song } = require("../models/song.js");
const { userAuth } = require("../middleware/auth.js")

songRouter.get("/myMusic/song/all", userAuth, async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).send({ message: "Songs fetched successfully", songs, totalCount: songs.length });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

songRouter.post("/myMusic/song/add", async (req, res) => {
    const { songName, albumName } = req.body;
    try {
        const isSongPresent = await Song.findOne({ songName });
        if (isSongPresent) {
            res.status(400).send({ message: "Song with same name already present", songName });
        }
        const newSong = new Song({ songName, albumName });
        await newSong.save();
        res.status(200).send({ message: "Song added successfully", songName, albumName });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured, Fill all required and valid data" });
    }
});

songRouter.delete("/myMusic/song/delete", async (req, res) => {
    const { songName } = req.body;
    try {
        const isSongPresent = await Song.findOne({ songName });
        if (!isSongPresent) {
            res.status(400).send({ ERROR: "Song does not exist already" });
        }
        const deletedSong = await Song.findOneAndDelete({ songName });
        if (deletedSong) {
            res.status(200).send({ message: "Song deleted successfully", songName });
        }
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

module.exports = { songRouter }