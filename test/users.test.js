const expect = require('chai').expect;
const request = require('supertest-as-promised');

const app = require('../index');
const database = require('../app/database/index').instance;

const prepEnv = () => {
    return database.mongoose.dropDatabase();
};

const asUser = (app, email, password = '123456') => {
    let signIn = null;

    const makeRequest = (method, path) => {
        const req = request(app)[method](path);
        if (signIn && signIn.credentials) {
            req.set('Authorization', `Bearer ${signIn.credentials.accessToken}`);
        }
        return req;
    };

    return {
        do: {
            register: () => {
                return makeRequest('post', '/api/v1/users')
                    .send({ email, password })
                    .expect(200);
            },
            login: () => {
                return makeRequest('post', '/api/v1/auth')
                    .send({ email, password })
                    .expect(200)
                    .then(({ body }) => {
                        expect(body).to.have.keys(['user', 'credentials']);
                        signIn = body;
                    });
            },
            get: (...args) => makeRequest('get', ...args),
        },
        get user() {
            return signIn.user;
        }
    };
};

describe('Users', () => {
    const user = asUser(app, 'abc');
    before(() => {
        return prepEnv()
            .then(() => user.do.register())
            .then(() => user.do.login());
    });

    it('List', () => {
        user.do.get('/api/v1/users')
            .expect(200)
            .then(({ body }) => {
                expect(body).to.be.an('array');
                // Empty?!
                // Array of what?!
            });
    });
    it('Detail', () => {
        return user.do.get(`/api/v1/users/${user.user.id}`)
            .expect(200)
            .then(({ body }) => {
                expect(body.id).to.equal(user.user.id);
            });
    });
});
