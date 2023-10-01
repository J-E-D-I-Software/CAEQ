const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const app = require('../../app');

const agent = request.agent(app);

const testGetAllArchitectUsers = async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(20);
};

const testGetAllArchitectUsersWithParams = (paramKey, paramValue) => async () => {
    const endpoint = `/architectusers?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
};

const testGetArchitectUser = async () => {
    const endpoint = '/architectusers';
    let res = await agent.get(`${endpoint}/3454534534`).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let users = ArchitectUser.find();
    users.getFilter();
    users = await users.exec();
    res = await agent.get(`${endpoint}/${users[0]._id}`).send();

    expect(res.statusCode).toEqual(200);
};



const testPagination = async () => {
    const page = 1; 
    const limit = 10;
    const endpoint = `/architectusers?page=${page}&limit=${limit}`;

    const res = await agent.get(endpoint);

    expect(res.statusCode).toEqual(200);
};



beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect User GET', () => {
    test('successful', () => testGetAllArchitectUsers());
    test('successful', () => testGetArchitectUser());
    test('successful', testGetAllArchitectUsersWithParams('email', 'john@example.com'));
    test('successful', testGetAllArchitectUsersWithParams('verified', false));
    test('pagination', () => testPagination());
});
