const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const newUser = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String
    }
}, {
    timestamps: true
});


newUser.statics.encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

newUser.statics.comparePass =  async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword);
};

module.exports = model('UserModel', newUser);