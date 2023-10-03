const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testArchitectLogin = async () => {
    const resTest1 = await agent.post('/architectusers/auth/login').send({
        email: 'sarahj@example.com',
        password: 'samplepass1',
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('sarahj@example.com');

    const resTest2 = await agent.post('/architectusers/auth/login').send({
        email: 'sarahj@example.com',
        password: 'wrongpass',
    });

    expect(resTest2.statusCode).toEqual(401);
    expect(resTest2.body.message).toEqual('Email o contraseña incorrectos.');
};

const testArchitectSignUp = async () => {
    const resTest1 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        password: 'password789',
        passwordConfirm: 'password789',
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('cesar@example.com');

    const resTest2 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        password: 'password789',
        passwordConfirm: 'password789',
    });

    expect(resTest2.statusCode).toEqual(400);
    expect(resTest2.body.message).toEqual(
        'Valor duplicado: "cesar@example.com". Por favor use otro valor.'
    );

    const resTest3 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesarjim@example.com',
        password: 'password',
        passwordConfirm: 'password789',
    });

    expect(resTest3.statusCode).toEqual(400);
    expect(resTest3.body.message).toEqual(
        'Datos inválidos: Por favor ingresa la misma contraseña.'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect login successful', () => {
    test('successful', () => testArchitectLogin());
    test('successful', () => testArchitectSignUp());
});
