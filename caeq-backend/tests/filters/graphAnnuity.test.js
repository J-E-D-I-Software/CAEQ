const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetAnnuityFilter = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/aggregations/get-annuities';

    const res = await agent.get(endpoint);

    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Graph Annuity GET', () => {
    test('succesful', () => testGetAnnuityFilter());
});