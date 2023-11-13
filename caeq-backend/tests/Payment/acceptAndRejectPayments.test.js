const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData, clearMuckedData } = require('../../models/testdata.setup');
const Course = require('../../models/course.model');
const { loginUser, loginAdmin } = require('../config/authSetUp');
const {
    Email,
    send,
    sendAnouncementToEveryone,
    sendPaymentAcceptedAlert,
    sendPaymentRejectedAlert,
} = require('../../utils/email');

jest.mock('../../utils/email');

describe('AcceptPayment', () => {
    let agent;

    beforeAll(async () => {
        await connectDB();
        await setUpDbWithMuckData();
        agent = request.agent(app);
    });

    beforeEach(async () => {
        await loginUser(agent, 'cvjj1504@outlook.com', 'password456');
        let course = Course.findOne({ courseName: 'Mampostería industrial' });
        course.getFilter();
        course = await course.exec();

        const response = await agent.post('/payment/startPayment').send({
            courseId: course._id,
            billImageURL:
                'https://www.google.com.mx/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        });
    });

    afterEach(async () => {
        await clearMuckedData();
        await setUpDbWithMuckData();
    });

    test('acceptPayment should return a succesful response', async () => {
        await loginAdmin(agent, 'john@example.com', 'password123');

        const paymentResponse = await agent.get('/payment').send();

        const paymentId = paymentResponse.body.data.documents[0]._id;

        const response = await agent.patch('/payment/acceptPayment').send({ paymentId });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.status).toBe('success');
        expect(response.body.data.document.status).toEqual('Aceptado');
    });

    test('rejectPayment should return a succesful response', async () => {
        await loginAdmin(agent, 'john@example.com', 'password123');

        const paymentResponse = await agent.get('/payment').send();

        const paymentId = paymentResponse.body.data.documents[0]._id;

        const response = await agent
            .patch('/payment/declinePayment')
            .send({ paymentId, declinedReason: 'No me gusta tu cara' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.status).toBe('success');
        expect(response.body.data.document.status).toEqual('Rechazado');
    });
});
