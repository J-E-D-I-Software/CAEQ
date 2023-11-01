const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const { loginAdmin , loginUser } = require('../config/authSetUp');
const agent = request.agent(app);

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

const declinePayment = async () => {
    await loginUser(agent, 'ana@example.com', 'password789');
    let course = Course.findOne({ courseName: 'Mampostería industrial' });
    course.getFilter();
    course = await course.exec();
    const payment = await agent.post('/payment/startPayment').send({
        courseId: course._id,
        billImageURL: 'https://example.com/luisgarcia-cv',
    });
    expect(payment.statusCode).toEqual(200);
    const paymentID = payment.body.data.document._id;
    await loginAdmin(agent, 'bob@example.com', 'password789');
    const payment3 = await agent.post('/payment/declinePayment').send({
        paymentId: paymentID,
    });
    expect(payment3.statusCode).toEqual(200);

};


describe('Caeq decline payment petition succesful', () => {
    test('successful', () => declinePayment());
});
