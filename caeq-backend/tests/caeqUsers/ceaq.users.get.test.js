const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const CaeqUser = require('../../models/caeq.user.model');
const app = require('../../app');

const agent = request.agent(app);

const testGetAllCaeqUsers = async () => {
    const endpoint = '/caequsers';
    const res = await agent
        .get(endpoint)
        .send();
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(10);
};

const testGetCaeqUser = async () => {
    const endpoint = '/caequsers';
    let res = await agent
        .get(`${endpoint}/3454534534`)
        .send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');
    
    let users = CaeqUser.find();
    users.getFilter();
    users = await users.exec();
    res = await agent
        .get(`${endpoint}/${users[0]._id}`)
        .send();

    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Caeq User GET', () => {
    test('successful', () => testGetAllCaeqUsers());
    test('successful', () => testGetCaeqUser());
});
