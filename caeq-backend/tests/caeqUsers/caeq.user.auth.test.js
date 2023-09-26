const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testCaeqLogin = async () => {
    const resTest1 = await agent.post('/caequsers/auth/login').send({
        email: 'bob@example.com',
        password: 'password789',
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('bob@example.com');

    const resTest2 = await agent.post('/caequsers/auth/login').send({
        email: 'sarahj@example.com',
        password: 'wrongpass',
    });

    expect(resTest2.statusCode).toEqual(401);
    expect(resTest2.body.message).toEqual('Email o contraseña incorrectos.');

    const resTest3 = await agent.post('/caequsers/auth/login').send({
        email: 'alice@example.com',
        password: 'password456',
    });

    expect(resTest3.statusCode).toEqual(401);
    expect(resTest3.body.message).toEqual(
        'No has sido verificado, espera a que un administrador verifique tu perfil.'
    );
};

const testCaeqSignUp = async () => {
    const resTest1 = await agent.post('/caequsers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        password: 'password789',
        passwordConfirm: 'password789',
    });

    expect(resTest1.statusCode).toEqual(200);
    expect(resTest1.body.message).toEqual(
        'Te has registrado con éxito, espera a que un administrador verifique tu perfil.'
    );

    const resTest2 = await agent.post('/caequsers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        password: 'password789',
        passwordConfirm: 'password789',
    });

    expect(resTest2.statusCode).toEqual(400);
    expect(resTest2.body.message).toEqual(
        'Valor duplicado: "cesar@example.com". Por favor use otro valor.'
    );

    const resTest3 = await agent.post('/caequsers/auth/signup').send({
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

describe('Caeq login successful', () => {
    test('successful', () => testCaeqLogin());
    test('successful', () => testCaeqSignUp());
});
