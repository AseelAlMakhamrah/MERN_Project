const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
posterId: {
    type: String,
    required: true
},
comments: {
    type: [{
        commenterId : String,
    text: String,
    timestamp: Number
    }],
    required:true,
},
likers :{
    type: [String],
    required:true,
},
likesCount :{
    type: Number,
    required:true,
},
text:{
    type: String,
    required:true,
    trim: true
},
timestamp: {
    type: Number,
    required: true
}
});
module.exports = mongoose.model('Post', PostSchema);

