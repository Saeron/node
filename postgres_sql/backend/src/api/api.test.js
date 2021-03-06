const supertest = require('supertest');

const app = require('../app');
const project = require('../constants/project');

describe('Get /api/v1/states', () => {
    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.message).toEqual(project.message);
    });
});