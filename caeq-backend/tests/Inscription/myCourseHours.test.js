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

    // Assuming you have a specific email to find an ArchitectUser
    const userEmail = 'relisib653@mugadget.com';
    const user = await ArchitectUser.findOne({ email: userEmail }).exec();

    // Check if the user is found
    if (!user) {
        throw new Error(`User with email ${userEmail} not found.`);
    }
    const endpoint = `/inscription/myCourseHours/${user._id}`;

    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
};

describe('Architect gets hours of course', () => {
    test('successful', () => testGetCourseHours());
});
