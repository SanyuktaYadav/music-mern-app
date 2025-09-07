const express = require("express");
const songHistoryRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const { SongHistory } = require("../models/songHistory.js");
const { Song } = require("../models/song.js");

songHistoryRouter.post("/myMusic/songHistory/save", userAuth, async (req, res) => {
    try {
        const { songId } = req.body;
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(400).send({ ERROR: "Song is not present" });
        }
        const userId = req.user._id;
        const newHistory = new SongHistory({
            song: songId,
            songName: song.songName,
            user: userId,
            playedAt: new Date(),
        });
        await newHistory.save();
        res.status(201).send({ message: 'Song play logged successfully' });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

songHistoryRouter.get("/myMusic/songHistory/all", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const isAdmin = req.user.type === 'admin';
        let history;
        if (isAdmin) {
            history = await SongHistory.find()
                .populate('song')
                .populate('user', 'name email')
                .sort({ playedAt: -1 });
        } else {
            history = await SongHistory.find({ user: userId })
                .populate('song')
                .populate('user', 'name email')
                .sort({ playedAt: -1 });
        }
        res.status(200).send({ message: "Song history fetched successfully", history, totalCount: history.length });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

module.exports = { songHistoryRouter }