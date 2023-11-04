const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Session = require('../../models/session.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testDeleteSession = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/sessions';
    let res = await agent.delete(`${endpoint}/3454534534`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let session = Session.findOne({ time: '12:00 hrs' });
    session.getFilter();
    session = await session.exec();
    res = await agent.delete(`${endpoint}/${session._id}`).send();
    expect(res.statusCode).toEqual(204);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Session Delete', () => {
    test('successful', () => testDeleteSession());
});
