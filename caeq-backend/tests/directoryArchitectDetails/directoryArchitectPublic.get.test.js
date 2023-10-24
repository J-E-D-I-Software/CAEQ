const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const app = require('../../app');
const e = require('express');

const agent = request.agent(app);

const testGetAllPublicArchitectDetails = async () => {
    const endpoint = '/architectusers/public';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200); //
    expect(res.body.results).toEqual(6);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Directory Architect Details GET', () => {
    test('successful', () => testGetAllPublicArchitectDetails());
});
