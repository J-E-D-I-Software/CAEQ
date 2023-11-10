const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testGetAllRooms = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/services/';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(5);

}

beforeAll(async () => {
    await  connectDB();
    await setUpDbWithMuckData();
});

describe('Room Offer GET', () => {
    test('succesful', () => testGetAllRooms());
});