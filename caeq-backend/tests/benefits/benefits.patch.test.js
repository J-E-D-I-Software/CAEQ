const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Benefit = require('../../models/benefits.model');

const agent = request.agent(app);

const testPatchBenefit = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');

    let endpoint = '/benefits/34545345345';
    let data = {
        name: 'Test Benefit',
        description: 'Test Benefit Description',
        location: 'Test Benefit Location',
        contact: 'Test Benefit Contact',
        website: 'Test Benefit Website',
        category: 'Test Benefit Category'
    };

    let res = await agent.patch(endpoint).send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 34545345345');

    let benefit = Benefit.findOne({ name: 'Oferta laboral para carpinteros' });
    benefit.getFilter();
    benefit = await benefit.exec();

    endpoint = `/benefits/${benefit._id}`;
    res = await agent.patch(endpoint).send(data);
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Benefit PATCH', () => {
    test('successful', () => testPatchBenefit());
});
