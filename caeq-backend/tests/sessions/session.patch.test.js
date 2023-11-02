const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Session = require('../../models/session.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testPatchSession = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/sessions';
    let res = await agent.patch(`${endpoint}/3454534534`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let session = Session.findOne({ time: '12:00 hrs' });
    session.getFilter();
    session = await session.exec();
    res = await agent.patch(`${endpoint}/${session._id}`).send({
        time: '22:00',
    });
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Session PATCH', () => {
    test('successful', () => testPatchSession());
});
