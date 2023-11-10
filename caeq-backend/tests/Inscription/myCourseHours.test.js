const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const ArchitectUser = require('../../models/architect.user.model');
const { loginUser } = require('../config/authSetUp');
const agent = request.agent(app);
const DateRangeMap = require('../../utils/dateRangeMap');

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

const testGetCourseHours = async () => {
    await loginUser(agent, 'ana@example.com', 'password789');
    const endpoint1 = '/courses';
    let res1 = await agent.get(`${endpoint1}/3454534534`).send();

    expect(res1.statusCode).toEqual(400);
    expect(res1.body.message).toEqual('Inválido _id: 3454534534');

    let courses = Course.find();
    courses.getFilter();
    courses = await courses.exec();

    const courseId = courses[0]._id; // Replace with the actual course ID
    const endpoint = `/inscription/myCourseHours/${courseId}`;

    // Assuming you have a specific email to find an ArchitectUser
    const userEmail = 'relisib653@mugadget.com';
    const user = await ArchitectUser.findOne({ email: userEmail }).exec();

    // Check if the user is found
    if (!user) {
        throw new Error(`User with email ${userEmail} not found.`);
    }

    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
};

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
