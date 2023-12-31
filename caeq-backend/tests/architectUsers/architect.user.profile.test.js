const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Profile = require('../../models/architect.user.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetProfile = async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);
};

const testGetOneProfile = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    let endpoint = '/architectusers';
    let res = await agent.get(endpoint).send();
    let id = res.body.data.documents[0]._id;
    endpoint += `/${id}`;
    res = await agent.get(endpoint).send();
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Profile GET', () => {
    test('successful', () => testGetProfile());
    test('successful', () => testGetOneProfile());
});
