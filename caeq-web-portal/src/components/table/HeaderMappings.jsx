const currentYear = new Date().getFullYear();

const headerMappings = {
    collegiateNumber: 'Número de colegiado',
    DRONumber: 'Número de DRO',
    fullName: 'Nombre completo',
    memberType: 'Tipo de miembro',
    classification: 'Clasificación',
    specialties: 'Especialidades',
    mainProfessionalActivity: 'Actividad profesional principal',
    professionalLicense: 'Cédula profesional',
    dateOfAdmission: 'Fecha de ingreso',
    gender: 'Género',
    dateOfBirth: 'Fecha de nacimiento',
    age: 'Edad',
    university: 'Universidad',
    municipalityOfLabor: 'Municipio de trabajo',
    authorizationToShareInfo: 'Autorización para compartir información',
    lifeInsurance: 'Seguro de vida',
    lifeInsureID: 'Póliza de seguro de vida',
    homePhone: 'Número de casa',
    officePhone: 'Número de oficina',
    cellphone: 'Número de celular',
    email: 'Correo electrónico',
    homeAddress: 'Domicilio de particular',
    workAddress: 'Domicilio de trabajo',
    emergencyContact: 'Nombre de contacto de emergencia',
    positionsInCouncil: 'Cargos en consejos directivos',
    annuity: 'Anualidad pagada',
    [currentYear]: `Asistencias a asambleas ${currentYear}`,
    [currentYear - 1]: `Asistencias a asambleas ${currentYear - 1}`,
    [currentYear - 2]: `Asistencias a asambleas ${currentYear - 2}`,
};

export default headerMappings;
