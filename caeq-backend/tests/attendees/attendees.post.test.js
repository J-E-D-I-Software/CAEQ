const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const {
    setUpArchitectUserData,
    setUpCaeqUserData,
} = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const Gathering = require('../../models/gathering.model');
const Attendees = require('../../models/attendees.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);
let gathering;

const testCreateAttendee = async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);

    const architects = res.body.data.documents;

    const endpointAttendees = '/attendees';
    let resAttendees = await agent.post(endpointAttendees).send({
        idGathering: gathering._id,
        idArchitect: architects[0]._id,
        modality: 'Remoto',
    });

    expect(resAttendees.statusCode).toEqual(201);

    let resAttendees2 = await agent.post(endpointAttendees).send({
        idGathering: gathering._id,
        idArchitect: architects[1]._id,
        modality: 'Presencial',
    });

    expect(resAttendees2.statusCode).toEqual(201);
};

const testCreateAttendeeAlreadyAttended = () => async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);

    const architects = res.body.data.documents;

    const endpointAttendees = '/attendees';
    let resAttendees = await agent.post(endpointAttendees).send({
        idGathering: gathering._id,
        idArchitect: architects[2]._id,
        modality: 'Remoto',
    });

    expect(resAttendees.statusCode).toEqual(201);

    let resAttendees2 = await agent.post(endpointAttendees).send({
        idGathering: gathering._id,
        idArchitect: architects[2]._id,
        modality: 'Presencial',
    });

    expect(resAttendees2.statusCode).toEqual(400);
    expect(resAttendees2.body.message).toEqual(
        'Datos inválidos: Ya registraste una asistencia del arquitecto a esta asamblea.'
    );
};

const testCreateAttendeeNoUser = () => async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);

    const endpointAttendees = '/attendees';
    let resAttendees = await agent.post(endpointAttendees).send({
        idGathering: gathering._id,
        modality: 'Presencial',
    });

    expect(resAttendees.statusCode).toEqual(400);
    expect(resAttendees.body.message).toEqual(
        'Datos inválidos: Una asistencia debe incluir un usuario.'
    );
};

const testCreateAttendeeNoGathering = () => async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);

    const architects = res.body.data.documents;

    const endpointAttendees = '/attendees';
    let resAttendees = await agent.post(endpointAttendees).send({
        idArchitect: architects[4]._id,
        modality: 'Presencial',
    });

    expect(resAttendees.statusCode).toEqual(400);
    expect(resAttendees.body.message).toEqual(
        'Datos inválidos: Una asistencia debe incluir una asamblea.'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpCaeqUserData();
    await setUpArchitectUserData();
    gathering = await Gathering.create({ day: 10, month: 4, year: 5 });
    await loginAdmin(agent, 'john@example.com', 'password123');
});

describe('Architect User GET', () => {
    test('successful', () => testCreateAttendee());
    test('successful', testCreateAttendeeAlreadyAttended());
    test('successful', testCreateAttendeeNoUser());
    test('successful', testCreateAttendeeNoGathering());
});
