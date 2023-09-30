const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const User = require('../../models/architect.user.model');
const app = require('../../app');

const agent = request.agent(app);

const testPatchArchitectUser = async () => {
    const endpoint = '/architectusers';
    let res = await agent.patch(`${endpoint}/3454534534`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let user = User.findOne({ email: 'emily@example.com' });
    user.getFilter();
    user = await user.exec();
    res = await agent.patch(`${endpoint}/${user._id}`).send({
        fullName: 'Edgar R.',
    });
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect User PATCH', () => {
    test('successful', () => testPatchArchitectUser());
});
