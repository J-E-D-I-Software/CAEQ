const request = require('supertest');
const app = require('../../app');
const RegistrationRequest = require('../../models/regiesterRequests.model');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);
let registrationRequests;

const testAcceptNewUser = async () => {
    const endpoint = `/architectusers/accept-architect/${registrationRequests[0]._id}`;
    const res = await agent.patch(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
        'Arquitecto verificado. El usuario ahora cuenta con acceso al portal.'
    );

    const res2 = await agent.patch(endpoint).send();

    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual('La petición de registro ya no existe.');
};

const testRejectNewUser = async () => {
    const endpoint = `/architectusers/reject-architect/${registrationRequests[1]._id}`;
    const res = await agent.patch(endpoint).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
        'Solicitud eliminada. El usuario no fue aceptado en el portal.'
    );

    const res2 = await agent.patch(endpoint).send();

    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual('La petición de registro ya no existe.');
};

const testPendingProfileNoLogin = async () => {
    const password = 'password789';
    const resTest1 = await agent
        .post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Jorge Castro')
        .field('email', 'pablin@tec.mx')
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
        .field('dateOfBirth', new Date('1983-07-20').toISOString())
        .field('municipalityOfLabor', 'Querétaro')
        .field('linkCV', 'https://example.com/luisgarcia-cv')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

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
        'Email incorrecto. No hay un usuario registrado con este correo. Si se registró recientemente, por favor espere a que un administrador verifique su perfil.'
    );
};

const testAcceptedProfileLogin = async () => {
    const password = 'password789';
    const resTest1 = await agent
        .post('/architectusers/auth/signup')
        .type('multipart/form-data')
        .field('fullName', 'Pablo Jimenez')
        .field('email', 'correoaceptado@example.com')
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
        .field('dateOfBirth', new Date('1983-07-20').toISOString())
        .field('municipalityOfLabor', 'Querétaro')
        .field('linkCV', 'https://example.com/luisgarcia-cv')
        .field('university', 'Universidad Autónoma de Querétaro')
        .field('professionalLicense', 'P98765')
        .field('workAddress', '123 Avenida Principal, Querétaro')
        .field('homeAddress', '456 Calle Secundaria, Querétaro')
        .field('specialty', 'Corresponsable en seguridad estructural')
        .field('positionsInCouncil', 'Vocal')
        .field('capacitationHours', 90);

    expect(resTest1.statusCode).toEqual(200);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.message).toEqual(
        'Te has registrado con éxito, espera a que un administrador verifique que eres el arquitecto con el número de colegiado 45672 y te de acceso al portal.'
    );

    await loginAdmin(agent, 'john@example.com', 'password123');
    const registrationRequest = await RegistrationRequest.find().populate('newInfo');
    const registrationId = registrationRequest.filter(
        (registration) => registration.newInfo.newEmail === 'correoaceptado@example.com'
    )[0]._id;

    const endpoint = `/architectusers/accept-architect/${registrationId}`;
    const resApprove = await agent.patch(endpoint).send();

    expect(resApprove.statusCode).toEqual(200);
    expect(resApprove.body.message).toEqual(
        'Arquitecto verificado. El usuario ahora cuenta con acceso al portal.'
    );

    const resLoginTest = await agent.post('/architectusers/auth/login').send({
        email: 'correoaceptado@example.com',
        password: password,
    });

    expect(resLoginTest.statusCode).toEqual(201);
    expect(resLoginTest.body).toBeTruthy();
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
    await loginAdmin(agent, 'john@example.com', 'password123');
    registrationRequests = await RegistrationRequest.find();
});

describe('Architect login successful', () => {
    test('successful', () => testAcceptedProfileLogin());
    test('successful', () => testPendingProfileNoLogin());
    test('successful', () => testAcceptNewUser());
    test('successful', () => testRejectNewUser());
});