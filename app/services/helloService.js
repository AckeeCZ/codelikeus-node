
exports.sayHello = (now = new Date()) => {
    return Promise.resolve({
        Hello: 'there!',
        myTimeIs: now,
    });
};
