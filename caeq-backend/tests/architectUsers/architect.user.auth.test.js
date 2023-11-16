const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testArchitectLogin = async () => {
    const resTest1 = await agent.post('/architectusers/auth/login').send({
        email: 'jcastr@tec.mx',
        password: 'password456',
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('jcastr@tec.mx');

    const resTest2 = await agent.post('/architectusers/auth/login').send({
        email: 'jcastr@tec.mx',
        password: 'wrongpass',
    });

    expect(resTest2.statusCode).toEqual(401);
    expect(resTest2.body.message).toEqual(
        'Contraseña incorrecta. Intente de nuevo por favor.'
    );
};

const testArchitectSignUp = async () => {
    const password = 'password789';
    const resTest1 = await agent.post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Pablo Jimenez')
        .field('email', 'cesar@example.com')
        .field('password', password)
        .field('passwordConfirm', password)
        .field('collegiateNumber', 45672)
        .field('memberType', 'Miembro de número')
        .field('classification', 'Docente')
        .field('DRONumber', 'DRO98765')
        .field('authorizationToShareInfo', true)
        .field('lifeInsurance', false)
        .field('lifeInsureID', '9937557b')
        .field('age', 40)
        .field('gender', 'Hombre')
        .field('cellphone', 5551112222)
        .field('homePhone', 5553334444)
        .field('officePhone', 5555556666)
        .field('emergencyContact', 'Ana García 5557778888')
        .field('mainProfessionalActivity', 'Ingeniero Civil')
        .field('dateOfAdmission', 2002)
        .field('dateOfBirth', '1983-07-20T00:00:00Z')
        .field('municipalityOfLabor', 'Querétaro')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('cesar@example.com');

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'cesar@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(201);
    expect(resLoginTest.body).toBeTruthy();
    expect(resLoginTest.body.data.user.email).toEqual('cesar@example.com');

    const resTest2 = await agent.post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Pablo Jimenez')
        .field('email', 'cesar@example.com')
        .field('password', password)
        .field('passwordConfirm', password)
        .field('collegiateNumber', 45672)
        .field('memberType', 'Miembro de número')
        .field('classification', 'Docente')
        .field('DRONumber', 'DRO98765')
        .field('authorizationToShareInfo', true)
        .field('lifeInsurance', false)
        .field('lifeInsureID', '9937557b')
        .field('age', 40)
        .field('gender', 'Hombre')
        .field('cellphone', 5551112222)
        .field('homePhone', 5553334444)
        .field('officePhone', 5555556666)
        .field('emergencyContact', 'Ana García 5557778888')
        .field('mainProfessionalActivity', 'Ingeniero Civil')
        .field('dateOfAdmission', 2002)
        .field('dateOfBirth', '1983-07-20T00:00:00Z')
        .field('municipalityOfLabor', 'Querétaro')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

    expect(resTest2.statusCode).toEqual(500);
    expect(resTest2.body.message).toEqual(
        'Una persona ya se ha inscrito en el portal con estos datos. ' +
        'Crea una nueva cuenta o si crees que es un error contacta a gerencia.'
    );

    const resTest3 = await agent.post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Pablo Jimenez')
        .field('email', 'cesar2@example.com')
        .field('password', password)
        .field('passwordConfirm', password+'wrong')
        .field('collegiateNumber', 456723)
        .field('memberType', 'Miembro de número')
        .field('classification', 'Docente')
        .field('DRONumber', 'DRO98765')
        .field('authorizationToShareInfo', true)
        .field('lifeInsurance', false)
        .field('lifeInsureID', '9937557b')
        .field('age', 40)
        .field('gender', 'Hombre')
        .field('cellphone', 5551112222)
        .field('homePhone', 5553334444)
        .field('officePhone', 5555556666)
        .field('emergencyContact', 'Ana García 5557778888')
        .field('mainProfessionalActivity', 'Ingeniero Civil')
        .field('dateOfAdmission', 2002)
        .field('dateOfBirth', '1983-07-20T00:00:00Z')
        .field('municipalityOfLabor', 'Querétaro')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

    expect(resTest3.statusCode).toEqual(400);
    expect(resTest3.body.message).toEqual(
        'Datos inválidos: Por favor ingresa la misma contraseña.'
    );
};

const testArchitectSignUpNew = async () => {
    const password = 'password789';
    const resTest1 = await agent.post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Pablo Jimenez')
        .field('email', 'sesar@example.com')
        .field('password', password)
        .field('passwordConfirm', password)
        .field('collegiateNumber', 41672)
        .field('memberType', 'Miembro de número')
        .field('classification', 'Docente')
        .field('DRONumber', 'DRO98765')
        .field('authorizationToShareInfo', true)
        .field('lifeInsurance', false)
        .field('lifeInsureID', '9937557b')
        .field('age', 40)
        .field('gender', 'Hombre')
        .field('cellphone', 5551112222)
        .field('homePhone', 5553334444)
        .field('officePhone', 5555556666)
        .field('emergencyContact', 'Ana García 5557778888')
        .field('mainProfessionalActivity', 'Ingeniero Civil')
        .field('dateOfAdmission', 2002)
        .field('dateOfBirth', '1983-07-20T00:00:00Z')
        .field('municipalityOfLabor', 'Querétaro')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('sesar@example.com');

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'sesar@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(201);
    expect(resLoginTest.body).toBeTruthy();
    expect(resLoginTest.body.data.user.email).toEqual('sesar@example.com');
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect login successful', () => {
    test('successful', () => testArchitectLogin());
    test('successful', () => testArchitectSignUp());
    test('successful', () => testArchitectSignUpNew());
});
