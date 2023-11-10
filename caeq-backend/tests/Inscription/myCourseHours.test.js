const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const { loginUser } = require('../config/authSetUp');
const agent = request.agent(app);
const DateRangeMap = require('../../utils/dateRangeMap');

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

const testGetCourseHours = (id) => async () => {
    await loginUser(agent, 'relisib653@mugadget.com', 'password123');
    const endpoint = `/insctiption/accredited/${id}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.documents);
};

describe('Architect Inscribe to course succesful', () => {
    test('successful', () => InscribeTo());
});

describe('DateRangeMap', () => {
    test('add method should add hours to an existing date range', () => {
        const dateRangeMap = new DateRangeMap();
        const date = new Date('2023-01-01');
        const value = 5;
        const hoursToAdd = 3;

        dateRangeMap.set(date, value);
        dateRangeMap.add(date, hoursToAdd);

        expect(dateRangeMap.map.size).toBe(1);

        const key = Array.from(dateRangeMap.map.keys())[0];
        const [start, end] = key.split(' - ');

        expect(dateRangeMap.map.get(key)).toBe(value + hoursToAdd);
    });

    test('add method should create a new date range if none exists', () => {
        const dateRangeMap = new DateRangeMap();
        const date = new Date('2023-01-01');
        const hoursToAdd = 3;

        dateRangeMap.add(date, hoursToAdd);

        expect(dateRangeMap.map.size).toBe(1);

        const key = Array.from(dateRangeMap.map.keys())[0];
        const [start, end] = key.split(' - ');

        expect(dateRangeMap.map.get(key)).toBe(hoursToAdd);
    });
});

describe('Architect gets hours of course', () => {
    test('successful', () => testGetCourseHours());
});
