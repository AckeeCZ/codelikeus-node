const { omit } = require('lodash');
const mongoose = require('../database').instance.mongoose;
const User = mongoose.model('User');

const invalidObjectIdToNull = error => {
    // Invalid id means 
    if (/^Cast to ObjectId failed/.test(error.message)) {
        return null;
    }
    throw error;
}

const remapId = (x) => {
    x.id = x._id;
    return omit(x, '_id');
}

const create = (data) => {
    return User.create(data);
};

const list = (params = {}) => {
    const limit = parseInt(params.limit) || 10;
    const offset = parseInt(params.offset) || 0;
    params = omit(params, ['limit', 'offset']);
    return User.find(params)
        .then(x => x.map(y => y.toJSON()).map(remapId));
};

const detail = (id, params = {}) => {
    return User.findById(id)
        .then(x => x.toJSON())
        .then(remapId)
        .catch(invalidObjectIdToNull);
};

const update = (id, data) => {
    return User.findByIdAndUpdate(id, data)
        .then(() => detail(id))
        .catch(invalidObjectIdToNull);
};

module.exports = {
    create,
    list,
    detail,
    update,
};
