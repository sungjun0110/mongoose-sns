const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    address: { 
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String,
    userAvatar: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', photoSchema);