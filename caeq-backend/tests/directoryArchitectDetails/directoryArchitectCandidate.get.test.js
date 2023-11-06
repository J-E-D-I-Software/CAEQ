const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetArchitectsWithParams = (paramKey, paramValue) => async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = `/architectusers?specialties?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    res.body.data.documents.forEach((architect) =>
        expect(architect.fullName.includes('paramValue'))
    );
    expect(res.body.data.documents);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Filter Architect GET', () => {
    test(
        'successful',
        testGetArchitectsWithParams('fullName[regex]', 'Ana Rodríguez')
    );
    test('successful', testGetArchitectsWithParams('annuity', 'false'));
});
