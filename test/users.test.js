const expect = require('chai').expect;
const request = require('supertest-as-promised');

const app = require('../index');

const asUser = (app, email, password = '123456') => {
    const makeRequest = (method, path) => {
        return request(app)[method](path);
    };

    let signIn = null;
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
        return user.do.register()
            .catch(() => null/* Whoops, Rregistraion failure when not emptying the db */)
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
            .expect(200) /* Whoops! No token sent!? */
            .then(({ body }) => {
                console.log(body)
            });
    });
});
