const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@axsos.me/
},
password :{
    type: String,
    required:true,
},

profile_pic: {
    type: String,
    default: "user.png"
},
bio:{
    type: String
},
followers: [{ type: ObjectId, ref: "userModels" }],
following: [{ type: ObjectId, ref: "userModels" }],
date: {
    type: Date,
    default: Date.now()
}

},
);
module.exports = mongoose.model('userModels', UserSchema);

