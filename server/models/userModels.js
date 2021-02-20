const mongoose = require('mongoose');
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
passwordConfirm :{
    type: String,
    required:true,
},
followers:{
    type: [String]
},
following:{
    type: [String]
},
bio:{
    type: String
},
createdAt:{
    type:Number,
    required: true
},
});
module.exports = mongoose.model('User', UserSchema);

