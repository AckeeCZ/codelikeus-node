module.exports = {
    server: {
        port: 3000,
    },
    auth: {
        jwtSecret: '3q56w4',
    },
    database: {
        mongo: {
            connection: 'mongodb://<dbuser>:<dbpassword>@ds121461.mlab.com:21461/clu-node'
        },
    },
};
