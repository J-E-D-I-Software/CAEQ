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

const startPayment = async () => {
    // Request to endpoint
    await loginUser(agent, 'ana@example.com', 'password789');
    let course = Course.findOne({ courseName: 'Mampostería industrial' });
    course.getFilter();
    course = await course.exec();
    const payment = await agent.post('/payment/startPayment').send({
        courseId: course._id,
        billImageURL: 'https://example.com/luisgarcia-cv',
    });
    expect(payment.statusCode).toEqual(200);
    const payment2 = await agent.post('/payment/startPayment').send({
        courseId: course._id,
        billImageURL: 'https://example.com/luisgarcia-cv',
    });
    expect(payment2.statusCode).toEqual(400);
};


describe('Architect send payment to course succesful', () => {
    test('successful', () => startPayment());
});
