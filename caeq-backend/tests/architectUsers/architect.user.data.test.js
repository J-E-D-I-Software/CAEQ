const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetArchitectPersonalData = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');

    const endpoint = '/architectusers';
    let res = await agent.get(`${endpoint}/3454534534`).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let users = ArchitectUser.find();
    users.getFilter();
    users = await users.exec();

    res = await agent.get(`${endpoint}/${users[0]._id}`).send();
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect User Data', () => {
    test('successful', () => testGetArchitectPersonalData());
});
