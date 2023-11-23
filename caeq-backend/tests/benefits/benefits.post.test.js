const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testPostBenefit = async () => {
    const endpoint = '/benefits';
    let data = {
        name: 'Test Benefit',
        description: 'Test Benefit Description',
        location: 'Test Benefit Location',
        contact: 'Test Benefit Contact',
        website: 'Test Benefit Website',
        category: 'Test Benefit Category'
    };

    await loginAdmin(agent, 'john@example.com', 'password123');
    let res = await agent.post(endpoint).send(data);

    expect(res.statusCode).toEqual(201);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Benefit POST', () => {
    test('successful', () => testPostBenefit());
});
