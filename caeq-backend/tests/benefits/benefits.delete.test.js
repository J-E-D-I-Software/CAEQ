const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Benefit = require('../../models/benefits.model');

const agent = request.agent(app);

const testDeleteBenefit = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');

    let endpoint = '/benefits/34545345345';

    let res = await agent.delete(endpoint);
    expect(res.statusCode).toEqual(400);

    let benefit = Benefit.findOne({ name: 'Oferta laboral para carpinteros' });
    benefit.getFilter();
    benefit = await benefit.exec();

    endpoint = `/benefits/${benefit._id}`;
    res = await agent.delete(endpoint);
    expect(res.statusCode).toEqual(204);

    // Check that the benefit was deleted
    res = await agent.get(endpoint);
    expect(res.statusCode).toEqual(404);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Benefit DELETE', () => {
    test('successful', () => testDeleteBenefit());
});
