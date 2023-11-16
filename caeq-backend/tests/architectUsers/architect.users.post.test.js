const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testPostArchitectUsers = async () => {
    const endpoint = '/architectusers';

    let res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'roberto@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaSegura',
        collegiateNumber: 2929292,
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
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
        positionsInCouncil: '15/12/2021 Vocal',
    });
    expect(res.statusCode).toEqual(201);

    res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'roberto@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaSegura',
        collegiateNumber: 98766,
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
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
        positionsInCouncil: '15/12/2021 Vocal',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
        'Valor duplicado: "roberto@gmail.com". Por favor use otro valor.'
    );

    res = await agent.post(endpoint).send({
        fullName: 'Roberto Ruiz',
        email: 'robert@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaNOSegura',
        collegiateNumber: 98767,
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
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
        positionsInCouncil: '15/12/2021 Vocal',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
        'Datos inválidos: Por favor ingresa la misma contraseña.'
    );
};

const testRequiredFields = async (field, errorMessage) => {
    const endpoint = '/architectusers';

    const requestBody = {
        fullName: 'Roberto Ruiz',
        email: 'robert@gmail.com',
        password: 'contrasenaSegura',
        passwordConfirm: 'contrasenaSegura',
        collegiateNumber: 98768,
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
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
        positionsInCouncil: '15/12/2021 Vocal',
    };

    // Deletes the current required field from the body
    delete requestBody[field];

    // Send the request
    const res = await agent.post(endpoint).send(requestBody);

    expect(res.body.message).toEqual('Datos inválidos: ' + errorMessage);
    expect(res.statusCode).toEqual(400);
};

//List of required fields error messages
const requiredErrorMessages = {
    fullName: 'Por favor dinos tu nombre!',
    email: 'Por favor dinos tu correo!',
    password: 'Por favor provee una contraseña.. Por favor ingresa la misma contraseña.',
    passwordConfirm: 'Por favor confirma tu contraseña.',
    collegiateNumber: 'Por favor dinos tu número de colegiado!',
    memberType: 'Por favor dinos qué |tipo de miembro| eres!',
    classification: 'Por favor dinos tu clasificación!',
    authorizationToShareInfo: 'Por favor dinos si autorizas compartir tu información',
    gender: 'Por favor dinos tu género!',
    cellphone: 'Por favor dinos tu número de celular!',
    homePhone: 'Por favor dinos tu número de casa!',
    emergencyContact: 'Por favor dinos tu contacto de emergencia (nombre y número)!',
    mainProfessionalActivity: 'Por favor dinos tu actividad principal profesional!',
    dateOfAdmission: 'Por favor dinos tu fecha de admisión!',
    dateOfBirth: 'Por favor dinos tu fecha de nacimiento!',
    municipalityOfLabor: 'Por favor dinos tu municipio de labor!',
    university: 'Por favor dinos tu universidad!',
    professionalLicense: 'Por favor dinos tu cédula profesional!',
    workAddress: 'Por favor dinos tu dirección de trabajo!',
    homeAddress: 'Por favor dinos tu dirección de casa!',
    specialty: 'Por favor dinos tu especialidad!',
    positionsInCouncil: 'Por favor dinos tus cargos en el consejo directivo!',
};

//List of required fields
const requiredFields = [
    ['fullName', requiredErrorMessages.fullName],
    ['email', requiredErrorMessages.email],
    ['password', requiredErrorMessages.password],
    ['passwordConfirm', requiredErrorMessages.passwordConfirm],
    ['collegiateNumber', requiredErrorMessages.collegiateNumber],
    ['memberType', requiredErrorMessages.memberType],
    ['classification', requiredErrorMessages.classification],
    ['gender', requiredErrorMessages.gender],
    ['emergencyContact', requiredErrorMessages.emergencyContact],
    ['mainProfessionalActivity', requiredErrorMessages.mainProfessionalActivity],
    ['dateOfAdmission', requiredErrorMessages.dateOfAdmission],
    ['municipalityOfLabor', requiredErrorMessages.municipalityOfLabor],
    ['university', requiredErrorMessages.university],
    ['professionalLicense', requiredErrorMessages.professionalLicense],
    ['workAddress', requiredErrorMessages.workAddress],
    ['homeAddress', requiredErrorMessages.homeAddress],
];

beforeAll(async () => {
    await connectDB();
});

describe('Architect User POST', () => {
    test('successful', () => testPostArchitectUsers());
});

describe('Architect User POST', () => {
    test.each(requiredFields)(
        'missing required field "%s" should return an error',
        (field, errorMessage) => {
            testRequiredFields(field, errorMessage);
        }
    );
});
