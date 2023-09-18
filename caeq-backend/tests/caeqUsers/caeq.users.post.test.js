const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');

const agent = request.agent(app);

const testPostCaeqUsers = async () => {
    const endpoint = '/api/v1/users/user';
    
    let res = await agent
        .post(endpoint)
        .send({
            fullName: 'Roberto Ruiz',
            email: 'roberto@gmail.com',
            password: 'contrasenaSegura',
            passwordConfirm: 'contrasenaSegura'
        });

    expect(res.statusCode).toEqual(201);

    res = await agent
        .post(endpoint)
        .send({
            fullName: 'Roberto Ruiz',
            email: 'roberto@gmail.com',
            password: 'contrasenaSegura',
            passwordConfirm: 'contrasenaSegura'
        });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Valor duplicado: "roberto@gmail.com". Por favor use otro valor.');
    
    res = await agent
        .post(endpoint)
        .send({
            fullName: 'Roberto Ruiz',
            email: 'roberto@gmail.com',
            password: 'contrasenaSegura',
            passwordConfirm: 'contrasenaNOSegura'
        });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Datos inválidos: Por favor ingresa la misma contraseña.');
};

beforeAll(async () => {
    await connectDB();
});

describe('Caeq User POST', () => {
    test('successful', () => testPostCaeqUsers());
});
