const userRepository = require('../repositories/userRepository');

exports.userList = (params) => {
    return userRepository.list(params);
};

exports.userDetail = (userId, params) => {
    return userRepository.detail(userId);
};

exports.userUpdate = (userId, data, params) => {
    return userRepository.update(userId, data);
};

exports.userDelete = (userId, params) => {
    return Promise.reject(new Error('Not Implemented'));
};

exports.userCreate = (data, params) => {
    return userRepository.create(data);
};
