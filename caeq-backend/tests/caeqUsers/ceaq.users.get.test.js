const request = require('supertest');
const { connectDB, dropCollections } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const app = require('../../app');
const User = require('../../models/caeq.user.model');

const agent = request.agent(app);

const testGetAllCaeqUsers = async () => {
    const endpoint = '/caequsers';
    const res = await agent
        .get(endpoint)
        .send();
    
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);
    
};

const testGetCaeqUser = async () => {
    const endpoint = '/caequsers';
    let res = await agent
        .get(`${endpoint}/3454534534`)
        .send();
    
    expect(res.statusCode).toEqual(404);
    
    res = await agent
        .get(`${endpoint}/3454534534`)
        .send();
    
    expect(res.statusCode).toEqual(404);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Caeq User GET', () => {
    test('successful', () => testGetAllCaeqUsers());
    test('successful', () => testGetCaeqUser());
});
