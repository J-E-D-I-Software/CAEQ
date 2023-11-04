const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Session = require('../../models/session.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetAllSessions = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/sessions';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(7);
};

const testGetSessionsWithParams = (paramKey, paramValue) => async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = `/sessions?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.documents);
};

const testGetSession = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/sessions';
    let res = await agent.get(`${endpoint}/3454534534`).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let sessions = Session.find();
    sessions.getFilter();
    sessions = await sessions.exec();
    res = await agent.get(`${endpoint}/${sessions[0]._id}`).send();

    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Session GET', () => {
    test('successful', () => testGetAllSessions());
    test('successful', () => testGetSession());
    test('successful', testGetSessionsWithParams('time', '12:00 hrs'));
    test('successful', testGetSessionsWithParams('modality', 'Presencial'));
});
