const expect = require('chai').expect;
const request = require('supertest-as-promised');

const app = require('../index');

describe('Users', () => {
    it('List', () => {
        request(app).get('/api/v1/users')
            .expect(200)
            .then(({ body }) => {
                expect(body).to.be.an('array');
                // Empty?!
                // Array of what?!
            });
    });
});
