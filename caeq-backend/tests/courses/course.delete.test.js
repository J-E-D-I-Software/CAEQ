const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const app = require('../../app');

const agent = request.agent(app);

const testDeleteCourse = async () => {
    const endpoint = '/courses';
    let res = await agent.delete(`${endpoint}/3454534534`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Inválido _id: 3454534534');

    let course = Course.findOne({ courseName: 'Mampostería industrial' });
    course.getFilter();
    course = await course.exec();
    res = await agent.delete(`${endpoint}/${course._id}`).send();
    expect(res.statusCode).toEqual(204);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Course Delete', () => {
    test('successful', () => testDeleteCourse());
});
