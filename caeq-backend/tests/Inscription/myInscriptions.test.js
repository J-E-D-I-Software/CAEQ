const request = require('supertest');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const Inscription = require ('../../models/inscription.model')
const app = require('../../app');
const { loginUser } = require('../config/authSetUp');

const agent = request.agent(app);

const testGetMyCourses = async () => {
    await loginUser(agent, 'ana@example.com', 'password789');
    let course = Course.findOne({ courseName: 'Modelado y análisis de estructuras con SAP2000' });
    course.getFilter();
    course = await course.exec();
    const Inscribe = await agent.post('/inscription/inscribeTo').send({
        courseId: course._id,
    });
    expect(Inscribe.statusCode).toEqual(200);
    const Inscribe2 = await agent.post('/inscription/inscribeTo').send({
        courseId: course._id,
    });
    const endpoint = '/inscription/myInscriptions';
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toEqual(1);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Inscription GET', () => {
    test('successful', () => testGetMyCourses());
});
