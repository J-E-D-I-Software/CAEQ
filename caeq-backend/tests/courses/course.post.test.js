const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../../config/databaseTest');
const { loginAdmin } = require('../../config/authSetUp');
const { setUpDbWithMuckData } = require('../../../models/testdata.setup');

const agent = request.agent(app);

const testPostCourse = async () => {
    const endpoint = '/courses';
    let data = {
        courseName: 'Mampostería industrial',
        modality: 'Presencial',
        numberHours: 7,
        pricing: 'Pagado',
        startDate: '2023-10-03T00:00:00',
        endDate: '2023-10-31T00:00:00',
        schedule: '5:00pm - 6:00pm',
        daysOfSession: 'LU-MA-MI',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.'.repeat(
                3
            ),
        temario:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        objective:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        place: 'Aula 3 CAEQ',
        includes:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        price: 120.3,
        capacity: 10,
        teacherName: 'Juan Ernesto Cevilla',
        teacherReview:
            'Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.',
        paymentInfo: '',
        imageUrl:
            'https://caeq.org/wp-content/uploads/2023/08/MAMPOSTERIA-ESTRUCTURAL_Mesa-de-trabajo-1.png',
    };

    await loginAdmin(agent, 'john@example.com', 'password123');
    let res = await agent.post(endpoint).send(data);

    expect(res.statusCode).toEqual(201);
};

const testPostCourseWithIncorrectDates = async () => {
    const endpoint = '/courses';
    let data = {
        courseName: 'Mampostería industrial',
        modality: 'Presencial',
        numberHours: 7,
        pricing: 'Pagado',
        startDate: '2023-10-03T00:00:00',
        endDate: '2023-08-31T00:00:00',
        schedule: '5:00pm - 6:00pm',
        daysOfSession: 'LU-MA-MI',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.'.repeat(
                3
            ),
        temario:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        objective:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        place: 'Aula 3 CAEQ',
        includes:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        price: 120.3,
        capacity: 10,
        teacherName: 'Juan Ernesto Cevilla',
        teacherReview:
            'Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.',
        paymentInfo: '',
        imageUrl:
            'https://caeq.org/wp-content/uploads/2023/08/MAMPOSTERIA-ESTRUCTURAL_Mesa-de-trabajo-1.png',
    };

    await loginAdmin(agent, 'john@example.com', 'password123');
    let res = await agent.post(endpoint).send(data);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
        'La fecha fin debe de ir después de la fecha de inicio'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Course POST', () => {
    test('successful', () => testPostCourse());
    test('successful', () => testPostCourseWithIncorrectDates());
});
