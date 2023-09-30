const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');

const agent = request.agent(app);

const testPostCourse = async () => {
    const endpoint = '/courses';
    let data = {
        courseName: "Mampostería industrial",
        modality: "Presencial",
        numberHours: 7,
        startDate: "2023-10-03T00:00:00",
        endDate: "2023-10-31T00:00:00",
        schedule: "5:00pm - 6:00pm",
        daysOfSession: "LU-MA-MI",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.".repeat(3),
        temario: "... more maths",
        objective: "Generar modelos de análisis de diferentes sistemas estructurales...",
        place: "Aula 3 CAEQ",
        includes: "includes",
        price: 120.30,
        teacherName: "Juan Ernesto Cevilla",
        teacherReview: "Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.",
        paymentInfo: "",
        imageUrl: "https://caeq.org/wp-content/uploads/2023/08/MAMPOSTERIA-ESTRUCTURAL_Mesa-de-trabajo-1.png",
    };

    let res = await agent.post(endpoint).send(data);

    expect(res.statusCode).toEqual(201);
};

beforeAll(async () => {
    await connectDB();
});

describe('Course POST', () => {
    test('successful', () => testPostCourse());
});
