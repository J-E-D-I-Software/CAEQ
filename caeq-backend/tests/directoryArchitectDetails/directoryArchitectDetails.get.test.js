const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const app = require('../../app');
const e = require('express');

const agent = request.agent(app);

const testGetAllDirectoryArchitectDetails = async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200); //
    expect(res.body.results).toEqual(6);
};

const testGetDirectoryArchitectDetails = async () => {
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

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Directory Architect Details GET', () => {
    test('successful', () => testGetAllDirectoryArchitectDetails());
    test('successful', () => testGetDirectoryArchitectDetails());
});
