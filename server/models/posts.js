const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },
    postedBy: {
        type: ObjectId,
        ref: "userModels"
    },
    likes: [{ type: ObjectId, ref: "userModels" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "userModels" }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const postModel = mongoose.model('posts', PostSchema)
module.exports = postModel;