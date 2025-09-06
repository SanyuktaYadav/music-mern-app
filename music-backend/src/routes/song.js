const express = require("express");
const songRouter = express.Router();
const { Song } = require("../models/song.js");
const { userAuth } = require("../middleware/auth.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const ClOUDINARY_CLOUD_NAME = process.env.ClOUDINARY_CLOUD_NAME;
const ClOUDINARY_API_KEY = process.env.ClOUDINARY_API_KEY;
const ClOUDINARY_API_SECRET = process.env.ClOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: ClOUDINARY_CLOUD_NAME,
    api_key: ClOUDINARY_API_KEY,
    api_secret: ClOUDINARY_API_SECRET,
});

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
});

const upload = multer({ storage });

const songFilesUpload = upload.fields([
    { name: "songPoster", maxCount: 1 },
    { name: "songAudioFile", maxCount: 1 }
]);

songRouter.post("/myMusic/song/all", userAuth, async (req, res) => {
    try {
        const { songName } = req.body;
        let songs;
        if (songName) {
            const search = songName.trim().toLowerCase();
            songs = await Song.find({
                songName: { $regex: search, $options: 'i' } // 'i' = case-insensitive
            });
        } else {
            songs = await Song.find();
        }
        res.status(200).send({ message: "Songs fetched successfully", songs, totalCount: songs.length });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

songRouter.get("/myMusic/song/previewSongs", async (req, res) => {
    try {
        const songs = await Song.aggregate([{ $sample: { size: 2 } }]);
        res.status(200).send({ message: "Songs fetched successfully", songs, totalCount: songs.length });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

songRouter.get("/myMusic/song/getById/:songId", async (req, res) => {
    try {
        const { songId } = req.params;
        const song = await Song.findById(songId);
        res.status(200).send({ message: "Song fetched successfully", song });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured" });
    }
});

songRouter.post("/myMusic/song/add", userAuth, songFilesUpload, async (req, res) => {
    try {
        const files = req.files;
        // const songPoster = files?.songPoster?.[0]?.buffer.toString('base64') || null;
        const { songName, albumName } = req.body;

        const audioFilePath = files.songAudioFile[0].path;
        const posterFilePath = files.songPoster[0].path;

        // console.log("audioFilePath = ", audioFilePath)
        // console.log("posterFilePath = ", posterFilePath)

        // Upload audio to Cloudinary (resource_type: 'raw' for MP3)
        const audioUpload = await cloudinary.uploader.upload(audioFilePath, {
            resource_type: "raw",
            folder: "MUSIC_APP_FILES/audio"
        });

        // Upload poster to Cloudinary (default is image)
        const posterUpload = await cloudinary.uploader.upload(posterFilePath, {
            folder: "MUSIC_APP_FILES/posters"
        });

        // console.log("audioUpload = ", audioUpload);
        // console.log("posterUpload = ", posterUpload);


        const isSongPresent = await Song.findOne({ songName });
        if (isSongPresent) {
            res.status(400).send({ message: "Song with same name already present", songName });
        }
        const newSong = new Song({
            songName,
            albumName,
            songPoster: posterUpload.secure_url,
            songAudioFile: audioUpload.secure_url
        });
        await newSong.save();
        res.status(200).send({ message: "Song added successfully", songName, albumName });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured, Fill all required and valid data" });
    }
});

songRouter.patch("/myMusic/song/edit", userAuth, songFilesUpload, async (req, res) => {
    try {
        const files = req.files;
        const { songId, songName, albumName } = req.body;

        if(!songId) {
            return res.status(400).send({ message: "Please provide song to edit" });
        }

        const isSongPresent = await Song.find({ _id: songId });
        if (!isSongPresent) {
            return res.status(400).send({ message: "Song is not present" });
        }

        let updatedFields = {};

        if (songName) updatedFields.songName = songName;
        if (albumName) updatedFields.albumName = albumName;

        // Upload new audio file if provided
        if (files?.songAudioFile?.length > 0) {
            const audioFilePath = files.songAudioFile[0].path;
            const audioUpload = await cloudinary.uploader.upload(audioFilePath, {
                resource_type: "raw",
                folder: "MUSIC_APP_FILES/audio"
            });
            updatedFields.songAudioFile = audioUpload.secure_url;
        }

        if (files?.songPoster?.length > 0) {
            const posterFilePath = files.songPoster[0].path;
            const posterUpload = await cloudinary.uploader.upload(posterFilePath, {
                folder: "MUSIC_APP_FILES/posters"
            });
            updatedFields.songPoster = posterUpload.secure_url;
        }

        const updatedSong = await Song.findByIdAndUpdate(
            songId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedSong) {
            return res.status(400).send({ message: "Failed to update song" });
        }

        res.status(200).send({ message: "Song updated successfully", updatedFields });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send({ ERROR: "Some error has occured, Fill all required and valid data" });
    }
});

songRouter.delete("/myMusic/song/delete", userAuth, async (req, res) => {
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