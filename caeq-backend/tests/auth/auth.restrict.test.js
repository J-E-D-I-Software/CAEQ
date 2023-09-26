const { loginAdmin, loginUser } = require('../config/authSetUp');
const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testRestriction = async () => {
    await loginUser(agent, 'sarahj@example.com', 'samplepass1');

    const protectedEndpoint = '/caequsers';
    let res1 = await agent.get(`${protectedEndpoint}`).send();

    expect(res1.statusCode).toEqual(403);
    expect(res1.body.message).toEqual(
        'No cuentas con los permisos para realizar esta acción.'
    );

    await loginAdmin(agent, 'john@example.com', 'password123');

    let res2 = await agent.get(`${protectedEndpoint}`).send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.results).toEqual(10);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Route restriction successful', () => {
    test('successful', () => testRestriction());
});
