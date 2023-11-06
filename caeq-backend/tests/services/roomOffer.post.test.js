const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testPostRoomOffer = async () => {
    await loginAdmin(agent, 'john@example.com', 'password123');
    const endpoint = '/services/';

    let res = await agent.post(endpoint).send({
        name: 'Salón Epigmenio Martínez',
        cost: 1200,
        capacity: 20,
        specifications: 'Aire acondicionado, Agua natural',
        roomPhoto: null,

    });

    expect(res.statusCode).toEqual(201);
    
};

const testRequiredFields = async (field, errorMessage) =>  {
    const endpoint = '/services/';

    const requestBody = {
        name: 'Salón Roberto Ruíz Obregón', 
        cost: 1250,
        capacity: 40,
        specifications: 'Aire acondicionado, proyector y Café',
        roomPhoto: null,
    };

    delete requestBody[field];

    const res = await agent.post(endpoint).send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Datos inválidos: ' + errorMessage); 
};

const requiredErrorMessages = {
    name: 'Nombre de salón requerido',
    cost: 'Costo del salón requerido',
    capacity: 'Capacidad del salón requerida',

};

const requiredFields = [
    ['name', requiredErrorMessages.name],
    ['cost', requiredErrorMessages.cost],
    ['capacity', requiredErrorMessages.capacity],
];

beforeAll(async () => {
    await  connectDB();
    await setUpDbWithMuckData();
});

describe('Room Offer POST', () => {
    test('succesful', () => testPostRoomOffer());
});

describe('Room Offer obligatory fields POST', () => {
    test.each(requiredFields)(
        'missing required field "%s" should return an error',
        (field, errorMessage) => {
            testRequiredFields(field, errorMessage);
        }
    );
});
