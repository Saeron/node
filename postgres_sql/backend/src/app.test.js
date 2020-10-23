const supertest = require('supertest');

const app = require('./app');
const project = require('./constants/project');

// define a set of test
describe('GET /', () => {
    it('should respond with a message', async () => {
        const response = await supertest(app)
            .get('/')
            .expect('Content-TYpe', /json/)
            .expect(200);
        expect(response.body.message)
        .toEqual(project.message);
    });
})