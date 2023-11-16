const populateDb = require('../utils/populateDb');
const catchAsync = require('../utils/catchAsync');
const CaeqUser = require('./caeq.user.model');
const CaeqUserData = require('./data/caeq.user');
const ArchitectUser = require('./architect.user.model');
const ArchitectUserData = require('./data/architect.user');
const Course = require('./course.model');
const CourseData = require('./data/course');
const Specialty = require('./specialty.model');
const SpecialtyData = require('./data/specialty');
const Session = require('./session.model.js');
const SessionsData = require('./data/sessions');
const Attendees = require('./attendees.model');
const AttendeesData = require('./data/attendee.js');
const Gathering = require('./gathering.model');
const GatheringData = require('./data/gathering.js');
const Inscription = require('./inscription.model');
const Services = require('./roomOffer.model.js');
const ServicesData = require('./data/services.js');
const RegisterRequests = require('./regiesterRequests.model');

/**
 * Set up 'CaeqUser' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpCaeqUserData = catchAsync(async () => {
    await populateDb(CaeqUser, CaeqUserData);
});

/**
 * Set up 'ArchitectUser' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpArchitectUserData = catchAsync(async () => {
    const specialties = await Specialty.find();

    ArchitectUserData[0].specialties = [specialties[0]._id];
    ArchitectUserData[1].specialties = [specialties[1]._id];
    ArchitectUserData[2].specialties = [specialties[2]._id];
    ArchitectUserData[3].specialties = [specialties[3]._id];
    ArchitectUserData[4].specialties = [specialties[0]._id, specialties[3]._id];

    await populateDb(ArchitectUser, ArchitectUserData);
});

/**
 * Set up 'Session' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpSessionData = catchAsync(async () => {
    const courses = await Course.find();
    const user1 = await ArchitectUser.findOne({
        email: 'relisib653@mugadget.com',
    });
    const user2 = await ArchitectUser.findOne({
        email: 'rigigit647@soebing.com',
    });

    // Add attendees to sessions
    SessionsData[0].attendees = [user1._id, user2._id];
    SessionsData[1].attendees = [user1._id, user2._id];
    SessionsData[2].attendees = [user1._id, user2._id];
    SessionsData[3].attendees = [user1._id];

    SessionsData[0].course = courses[0]._id;
    SessionsData[1].course = courses[0]._id;
    SessionsData[2].course = courses[0]._id;
    SessionsData[3].course = courses[0]._id;
    SessionsData[4].course = courses[1]._id;
    SessionsData[5].course = courses[1]._id;
    SessionsData[6].course = courses[2]._id;

    await populateDb(Session, SessionsData);
});

const setUpAttendeesData = catchAsync(async () => {
    const gatherings = await Gathering.find();
    const architect = await ArchitectUser.find();
    AttendeesData[0].idGathering = gatherings[0]._id;
    AttendeesData[1].idGathering = gatherings[1]._id;
    AttendeesData[2].idGathering = gatherings[2]._id;
    AttendeesData[3].idGathering = gatherings[3]._id;
    AttendeesData[4].idGathering = gatherings[4]._id;
    AttendeesData[5].idGathering = gatherings[5]._id;
    AttendeesData[6].idGathering = gatherings[6]._id;
    AttendeesData[7].idGathering = gatherings[7]._id;

    AttendeesData[0].idArchitect = architect[1]._id;
    AttendeesData[1].idArchitect = architect[1]._id;
    AttendeesData[2].idArchitect = architect[1]._id;
    AttendeesData[3].idArchitect = architect[1]._id;
    AttendeesData[4].idArchitect = architect[1]._id;
    AttendeesData[5].idArchitect = architect[1]._id;
    AttendeesData[6].idArchitect = architect[1]._id;
    AttendeesData[7].idArchitect = architect[2]._id;

    await populateDb(Attendees, AttendeesData);
});

/**
 * Set up 'Course' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpCourseData = catchAsync(async () => {
    await populateDb(Course, CourseData);
});

/**
 * Set up 'RegisterRequest' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpregisterRequests = catchAsync(async () => {
    const user1 = await ArchitectUser.findOne({ email: 'josh152002@outlook.com' });
    const user2 = await ArchitectUser.findOne({
        email: '97et9et7e90rt7javier@example.com',
    });
    const user3 = await ArchitectUser.findOne({
        email: '2654874682754723isabel@example.com',
    });

    const registerRequestData = [
        {
            overwrites: user1._id,
            newInfo: user2._id,
            architectNumber: 45672,
        },
        {
            overwrites: user1._id,
            newInfo: user3._id,
            architectNumber: 45672,
        },
    ];

    await populateDb(RegisterRequests, registerRequestData);
});

/**
 * Set up 'Specialty' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpSpecialtyData = catchAsync(async () => {
    await populateDb(Specialty, SpecialtyData);
});

const setUpGatheringData = catchAsync(async () => {
    await populateDb(Gathering, GatheringData);
});

const setUpServicesData = catchAsync(async () => {
    await populateDb(Services, ServicesData);
});

/**
 * Set up 'Inscription' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpInsciptionData = catchAsync(async () => {
    const course = await Course.findOne({
        courseName: 'Mampostería industrial',
    });
    const course2 = await Course.findOne({
        courseName: 'Excel intermedio',
    });
    const course3 = await Course.findOne({
        courseName: 'Modelado y análisis de estructuras con SAP2000',
    });
    const user1 = await ArchitectUser.findOne({
        email: 'relisib653@mugadget.com',
    });
    const user2 = await ArchitectUser.findOne({
        email: 'rigigit647@soebing.com',
    });
    const inscriptionData = [
        {
            course: course._id,
            user: user1._id,
            accredited: true,
        },
        {
            course: course._id,
            user: user2._id,
        },
        {
            course: course2._id,
            user: user1._id,
            accredited: true,
        },
        {
            course: course3._id,
            user: user1._id,
            accredited: true,
        },
    ];
    await populateDb(Inscription, inscriptionData);
});

/**
 * Set up the database with mock data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 * It sets up the 'CaeqUser' data by calling 'setUpCaeqUserData' and logs a message when the test data is uploaded to the database.
 */
exports.setUpDbWithMuckData = catchAsync(async () => {
    await setUpSpecialtyData();
    await setUpCaeqUserData();
    await setUpCourseData();
    await setUpArchitectUserData();
    await setUpSessionData();
    await setUpGatheringData();
    await setUpAttendeesData();
    await setUpInsciptionData();
    await setUpServicesData();
    await setUpregisterRequests();
    console.log('Test data uploaded to DB');
});

/**
 * Set up CAEQ user data.
 *
 * @function
 * @async
 * @throws {Error} Throws an error if there's a problem setting up the data.
 */
exports.setUpCaeqUserData = catchAsync(async () => {
    await setUpCaeqUserData();
});

/**
 * Set up architect user data.
 *
 * @function
 * @async
 * @throws {Error} Throws an error if there's a problem setting up the data.
 */
exports.setUpArchitectUserData = catchAsync(async () => {
    await setUpSpecialtyData();
    await setUpArchitectUserData();
});

/**
 * Clear all mucked data from the database.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 * It deletes all the documents from the collections used in the 'setUpDbWithMuckData' function.
 */
exports.clearMuckedData = catchAsync(async () => {
    await CaeqUser.deleteMany({});
    await ArchitectUser.deleteMany({});
    await Course.deleteMany({});
    await Specialty.deleteMany({});
    await Session.deleteMany({});
    await Attendees.deleteMany({});
    await Gathering.deleteMany({});
    await Inscription.deleteMany({});
    await Services.deleteMany({});
    console.log('Mucked data cleared from DB');
});
