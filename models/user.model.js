const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passwordSalt: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    emailToken: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'authentication'
});
const User = mongoose.model('User', userSchema);
module.exports = User;