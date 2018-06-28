const { isNil, defaults, omit } = require('lodash');
const config = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
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

exports.userDetail = (userId, context) => {
    if (!context.user) {
        return Promise.reject(new Unauthorized('Auth required'));
    }
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

exports.userLogin = (loginCredentials) => {
    return authenticate(loginCredentials)
        .then(user => [
            user,
            {
                accessToken: jwt.encode(
                    {
                        type: 'access',
                        user,
                        iat: Date.now(),
                        exp: Date.now() + 3600 * 1000,
                    },
                    config.auth.jwtSecret
                ),
                refreshToken: jwt.encode(
                    {
                        type: 'refresh',
                        user,
                        iat: Date.now(),
                        exp: Date.now() + 3600 * 1000 * 24 * 14,
                    },
                    config.auth.jwtSecret
                ),
            }
        ])
        .then(([user, credentials]) => (
            {
                user,
                credentials,
            }
        ));
};

exports.authenticateAccessToken = (token) => {
    if (!token) {
        return Promise.resolve(null);
    }
    return Promise.resolve()
        .then(() => jwt.decode(token, config.auth.jwtSecret))
        .then(unpacked => {
            // Check expiration?
            // Check against a database?
            return userRepository.detail(unpacked.user.id);
        })
        .catch(error => {
            console.error(error.message);
            return null;
        });
};
