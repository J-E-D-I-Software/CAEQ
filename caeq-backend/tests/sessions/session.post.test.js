const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testPostSession = async () => {
    const endpoint = '/sessions';
    let data = {
        date: new Date(),
        time: '12:00 hrs',
    };

    await loginAdmin(agent, 'john@example.com', 'password123');
    let res = await agent.post(endpoint).send(data);

    expect(res.statusCode).toEqual(201);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Session POST', () => {
    test('successful', () => testPostSession());
});
