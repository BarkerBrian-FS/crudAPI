const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    genre:{
        type: String,
        required: true
    },

    company:{
        type: String,
        require: true
    },

    created_at:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Game', gameSchema);