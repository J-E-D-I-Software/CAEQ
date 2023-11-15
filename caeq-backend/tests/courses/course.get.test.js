const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const app = require('../../app');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetAllCourses = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/courses';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(3);
};

const testGetCoursesWithParams = (paramKey, paramValue) => async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = `/courses?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    res.body.data.documents.forEach((course) =>
        expect(course.courseName.includes('paramValue'))
    );
    expect(res.body.data.documents);
};

const testGetCourse = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/courses';
    let res = await agent.get(`${endpoint}/3454534534`).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let courses = Course.find();
    courses.getFilter();
    courses = await courses.exec();
    res = await agent.get(`${endpoint}/${courses[0]._id}`).send();

    expect(res.statusCode).toEqual(200);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Course GET', () => {
    test('successful', () => testGetAllCourses());
    test('successful', () => testGetCourse());
    test(
        'successful',
        testGetCoursesWithParams('courseName[regex]', 'Mampostería industrial')
    );
    test('successful', testGetCoursesWithParams('modality', 'Presencial'));
});
