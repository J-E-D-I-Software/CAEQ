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
        'Contraseña incorrecta. Intente de nuevo por favor. Si te registraste recientemente, por favor espera a que un administrador verifique tu perfil.'
    );
};

const testArchitectSignUp = async () => {
    const password = 'password789';
    const resTest1 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        password: password,
        passwordConfirm: password,
        collegiateNumber: 90101,
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
        dateOfAdmission: 2002,
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

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'cesar@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(201);
    expect(resLoginTest.body).toBeTruthy();

    const resTest2 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'cesar@example.com',
        collegiateNumber: 2315,
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
        dateOfAdmission: 2002,
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
        collegiateNumber: 6666,
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
        dateOfAdmission: 2002,
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
    expect(resTest3.body.message).toEqual('Tus contraseñas deben coincidir.');
};

const testArchitectSignUpNew = async () => {
    const password = 'password789';
    const resTest1 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'sesar@example.com',
        password: password,
        passwordConfirm: password,
        collegiateNumber: 828282,
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
        dateOfAdmission: 2002,
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
    expect(resTest1.body.data.user.email).toEqual('sesar@example.com');

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'sesar@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(201);
    expect(resLoginTest.body).toBeTruthy();
    expect(resLoginTest.body.data.user.email).toEqual('sesar@example.com');
};

const testRegistrationCreation = async () => {
    const password = 'password789';
    const resTest1 = await agent.post('/architectusers/auth/signup').send({
        fullName: 'Pablo Jimenez',
        email: 'pablito@example.com',
        password: password,
        passwordConfirm: password,
        collegiateNumber: 45672,
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
        dateOfAdmission: 2002,
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

    expect(resTest1.statusCode).toEqual(200);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.message).toEqual(
        'Te has registrado con éxito, espera a que un administrador verifique que eres el arquitecto con el número de colegiado 45672 y te de acceso al portal.'
    );

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'pablito@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(401);
    expect(resLoginTest.body).toBeTruthy();
    expect(resLoginTest.body.message).toEqual(
        'Email incorrecto. No hay un usuario registrado con este correo. Si te registraste recientemente, por favor espera a que un administrador verifique tu perfil.'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect login successful', () => {
    test('successful', () => testArchitectLogin());
    test('successful', () => testArchitectSignUp());
    test('successful', () => testArchitectSignUpNew());
    test('successful', () => testRegistrationCreation());
});
