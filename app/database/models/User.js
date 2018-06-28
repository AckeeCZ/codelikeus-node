const mongoose = require('mongoose');

module.exports = connection => {
    const User = new mongoose.Schema({
        email: { type: String, unique: true, index: true },
        password: { type: String, default: null },
    });
    connection.model('User', User);
    return User;
};