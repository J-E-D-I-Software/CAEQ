const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpCaeqUserData } = require('../../models/testdata.setup');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetSpecialtiesFilter = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/aggregations/get-specialties';

    const res = await agent.get(endpoint);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual(
        'No hay arquitectos registrados'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpCaeqUserData();
});

describe('Graph Specialties GET', () => {
    test('succesful', () => testGetSpecialtiesFilter());
});