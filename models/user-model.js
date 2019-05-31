const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
    googleId: {type: String},
    thumbnail: {type: String}

});

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;