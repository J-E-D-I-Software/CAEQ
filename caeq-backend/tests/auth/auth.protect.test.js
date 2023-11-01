const { loginAdmin, loginUser } = require('../config/authSetUp');
const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testProtection = async () => {
    const protectedEndpoint = '/caequsers';
    let res1 = await agent.get(`${protectedEndpoint}`).send();

    expect(res1.statusCode).toEqual(401);
    expect(res1.body.message).toEqual(
        'No has iniciado sesión, por favor inicia sesión para obtener acceso.'
    );

    await loginAdmin(agent, 'john@example.com', 'password123');

    let res2 = await agent.get(`${protectedEndpoint}`).send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.results).toEqual(12);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Route protection successful', () => {
    test('successful', () => testProtection());
});
