const { isNil, defaults, omit } = require('lodash');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');

const throwOnEmpty = (error) => (value) => {
    if (value) {
        return value;
    }
    throw error;
}

const passwordHash = (data) => {
    if (!data) {
        return Promise.resolve(data);
    }
    if (isNil(data.password)) {
        return Promise.resolve(data);
    }
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(data.password, salt)
        })
        .then(hashedPassword => defaults(
            {
                password: hashedPassword,
            },
            data
        ));
};

exports.userList = (params) => {
    return userRepository.list(params);
};

exports.userDetail = (userId, params) => {
    return userRepository.detail(userId)
        .then(throwOnEmpty(new NotFound()))
        .then(x => omit(x, ['password']));
};

exports.userUpdate = (userId, data, params) => {
    return passwordHash(data)
        .then(data => userRepository.update(userId, data));
};

exports.userDelete = (userId, params) => {
    return Promise.reject(new Error('Not Implemented'));
};

exports.userCreate = (data, params) => {
    return passwordHash(data)
        .then(userRepository.create);
};

const authenticate = (credentials) => {
    if (!credentials || !credentials.email) {
        throw new Unauthorized('Incomplete auth credentials');
    }
    return userRepository.list({ email: credentials.email })
        .then(users => users.shift())
        .then(throwOnEmpty(new Unauthorized('User does not exist')))
        .then(user =>
            Promise.all([
                omit(user, ['password']),
                bcrypt.compare(
                    credentials.password,
                    user.password
                ),
            ])
        )
        .then(([user, passwordMatches]) => {
            if (!passwordMatches) {
                throw new Unauthorized('Invalid password');
            }
            return user;
        });
};

exports.userLogin = (credentials) => {
    return authenticate(credentials);
};
