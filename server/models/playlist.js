const mongoose = require('mongoose')

const playlist = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
    },
    tracks: Array
})

module.exports = mongoose.model('Playlist', playlist)