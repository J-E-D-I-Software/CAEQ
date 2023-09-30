const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const { loginAdmin, loginUser } = require('../config/authSetUp');

const agent = request.agent(app);

const testPostCaeqUsers = async () => {
    const endpoint = '/caequsers';

    let res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'roberto@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaSegura',
    });

    expect(res.statusCode).toEqual(201);

    res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'roberto@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaSegura',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
        'Valor duplicado: "roberto@gmail.com". Por favor use otro valor.'
    );

    res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'roberto@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaNOSegura',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
        'Datos inválidos: Por favor ingresa la misma contraseña.'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
    await loginAdmin(agent, 'john@example.com', 'password123');
});

describe('Caeq User POST', () => {
    test('successful', () => testPostCaeqUsers());
});
