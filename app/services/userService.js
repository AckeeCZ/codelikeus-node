const userRepository = require('../repositories/userRepository');
const NotFound = require('../errors/NotFound');

const throwOnEmpty = (error) => (value) => {
    if (value) {
        return value;
    }
    throw error;
}

exports.userList = (params) => {
    return userRepository.list(params);
};

exports.userDetail = (userId, params) => {
    return userRepository.detail(userId)
        .then(throwOnEmpty(new NotFound()));
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
