const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    coords: {
        type: [String],
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
}, {
    timestamps: true,
})

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
    groups: [groupSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', photoSchema);