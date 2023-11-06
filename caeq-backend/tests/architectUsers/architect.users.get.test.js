const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const Specialty = require('../../models/specialty.model');
const app = require('../../app');

const agent = request.agent(app);

const testGetAllArchitectUsers = async () => {
    const endpoint = '/architectusers';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(8);
};

const testGetAllArchitectUsersWithParams = (paramKey, paramValue) => async () => {
    const endpoint = `/architectusers?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    res.body.data.documents.forEach((architect) =>
        expect(architect[paramKey] === paramValue)
    );
};

const testGetArchitectsWithName = () => async () => {
    const endpoint = `/architectusers?fullName[regex]=L`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    res.body.data.documents.forEach((architect) =>
        expect(architect.fullName.includes('L'))
    );
};

const testGetArchitectsOrderCollegiateNumber = () => async () => {
    const endpoint = `/architectusers?sort=collegiateNumber`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);

    const architects = res.body.data.documents;

    // Check if the architects are ordered by collegiateNumber in ascending order
    let previousCollegiateNumber = -1;
    for (const architect of architects) {
        const currentCollegiateNumber = architect.collegiateNumber;

        // Ensure the current collegiateNumber is greater than or equal to the previous one
        expect(currentCollegiateNumber).toBeGreaterThanOrEqual(previousCollegiateNumber);

        previousCollegiateNumber = currentCollegiateNumber;
    }
};

const testGetArchitectsBySpecialty = () => async () => {
    const specialties = await Specialty.find();

    const endpoint = `/architectusers?specialties=${specialties[0]._id}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);

    const architects = res.body.data.documents;

    for (const architect of architects) {
        let hasSpecialty = false;
        for (const specialty of architect.specialties) {
            if (specialty.name === specialties[0].name) hasSpecialty = true;
        }
        expect(hasSpecialty).toEqual(true);
    }
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
    test('successful', testGetAllArchitectUsersWithParams('email', 'luis@example.com'));
    test('successful', testGetAllArchitectUsersWithParams('fullName', 'Luis García'));
    test('successful', testGetArchitectsWithName());
    test('successful', testGetArchitectsOrderCollegiateNumber());
    test('successful', testGetArchitectsBySpecialty());
    test('successful', testGetAllArchitectUsersWithParams('verified', false));
    test('pagination', () => testPagination());
});
