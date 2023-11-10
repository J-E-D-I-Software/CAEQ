const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const { loginUser } = require('../config/authSetUp');
const agent = request.agent(app);

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

const InscribeTo = async () => {
    // Request to endpoint
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
    expect(Inscribe2.statusCode).toEqual(400);
};


describe('Architect Inscribe to course succesful', () => {
    test('successful', () => InscribeTo());
});
