const mongoose = require('mongoose');

const songHistorySchema = new mongoose.Schema({
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    songName: {
        type: String, // keep a snapshot of the song name
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    playedAt: {
        type: Date,
        default: Date.now,
    },
});

const SongHistory = mongoose.model("SongHistory", songHistorySchema, 'songHistory');

module.exports = { SongHistory };
