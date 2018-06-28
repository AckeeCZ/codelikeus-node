const mongoose = require('mongoose');

module.exports = connection => {
    const User = new mongoose.Schema({
        email: { type: String, unique: true, index: true },
        password: String,
    });
    connection.model('User', User);
    return User;
};