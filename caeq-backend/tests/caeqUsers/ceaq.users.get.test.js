const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const CaeqUser = require('../../models/caeq.user.model');
const { loginAdmin, loginUser } = require('../config/authSetUp');
const app = require('../../app');

const agent = request.agent(app);

const testGetAllCaeqUsers = async () => {
    const endpoint = '/caequsers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(11);
};

const testGetAllCaeqUsersWithParams = (paramKey, paramValue) => async () => {
    const endpoint = `/caequsers?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
};

const testGetCaeqUser = async () => {
    const endpoint = '/caequsers';
    let res = await agent.get(`${endpoint}/3454534534`).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let users = CaeqUser.find();
    users.getFilter();
    users = await users.exec();
    res = await agent.get(`${endpoint}/${users[0]._id}`).send();

    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
    await loginAdmin(agent, 'john@example.com', 'password123');
});

describe('Caeq User GET', () => {
    test('successful', () => testGetAllCaeqUsers());
    test('successful', () => testGetCaeqUser());
    test('successful', testGetAllCaeqUsersWithParams('email', 'john@example.com'));
    test('successful', testGetAllCaeqUsersWithParams('verified', false));
});
