const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testPatchCourse = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/courses';
    let res = await agent.patch(`${endpoint}/3454534534`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let course = Course.findOne({ courseName: 'Mampostería industrial' });
    course.getFilter();
    course = await course.exec();
    res = await agent.patch(`${endpoint}/${course._id}`).send({
        fullName: 'Mampostería industrial con Eddie',
    });
    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Course PATCH', () => {
    test('successful', () => testPatchCourse());
});
