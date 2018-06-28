const { omit } = require('lodash');
const mongoose = require('../database').instance.mongoose;
const User = mongoose.model('User');

const create = (data) => {
    return User.create(data);
};

const list = (params = {}) => {
    const limit = parseInt(params.limit) || 10;
    const offset = parseInt(params.offset) || 0;
    params = omit(params, ['limit', 'offset']);
    return User.find(params)
        .then(x => x.map(y => y.toJSON()));
};

const detail = (id, params = {}) => {
    return User.findById(id)
        .then(x => x.toJSON());
};

const update = (id, data) => {
    return User.findByIdAndUpdate(id, data)
        .then(() => detail(id));
};

module.exports = {
    create,
    list,
    detail,
    update,
};
