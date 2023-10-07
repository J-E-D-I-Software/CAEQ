const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testArchitectLogin = async () => {
    const resTest1 = await agent.post('/architectusers/auth/login').send({
        email: 'luis@example.com',
        password: 'password123',
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('luis@example.com');

    const resTest2 = await agent.post('/architectusers/auth/login').send({
        email: 'luis@example.com',
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
        collegiateNumber: 98765,
        fullName: 'Luis García',
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '9937557b',
        age: 40,
        gender: 'Hombre',
        cellphone: 5551112222,
        homePhone: 5553334444,
        officePhone: 5555556666,
        emergencyContact: 'Ana García 5557778888',
        mainProfessionalActivity: 'Ingeniero Civil',
        dateOfAdmission: new Date('2010-02-15'),
        dateOfBirth: new Date('1983-07-20'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/luisgarcia-cv',
        university: 'Universidad Autónoma de Querétaro',
        professionalLicense: 'P98765',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en seguridad estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 90,
    });

    expect(resTest1.statusCode).toEqual(201);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.data.user.email).toEqual('cesar@example.com');

    const resTest2 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        collegiateNumber: 98765,
        fullName: 'Luis García',
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '9937557b',
        age: 40,
        gender: 'Hombre',
        cellphone: 5551112222,
        homePhone: 5553334444,
        officePhone: 5555556666,
        emergencyContact: 'Ana García 5557778888',
        mainProfessionalActivity: 'Ingeniero Civil',
        dateOfAdmission: new Date('2010-02-15'),
        dateOfBirth: new Date('1983-07-20'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/luisgarcia-cv',
        university: 'Universidad Autónoma de Querétaro',
        professionalLicense: 'P98765',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en seguridad estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 90,
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
        collegiateNumber: 98765,
        fullName: 'Luis García',
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '9937557b',
        age: 40,
        gender: 'Hombre',
        cellphone: 5551112222,
        homePhone: 5553334444,
        officePhone: 5555556666,
        emergencyContact: 'Ana García 5557778888',
        mainProfessionalActivity: 'Ingeniero Civil',
        dateOfAdmission: new Date('2010-02-15'),
        dateOfBirth: new Date('1983-07-20'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/luisgarcia-cv',
        university: 'Universidad Autónoma de Querétaro',
        professionalLicense: 'P98765',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en seguridad estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 90,
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
