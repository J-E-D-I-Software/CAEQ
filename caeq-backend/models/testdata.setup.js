const mongoose = require('mongoose');
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
const Inscription = require('./inscription.model');
const Services = require('./roomOffer.model.js')
const ServicesData = require('./data/services.js');


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
    const user1 = await ArchitectUser.findOne({ email: 'relisib653@mugadget.com' });
    const user2 = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    // Add attendees to sessions
    SessionsData[0].attendees = [user1._id, user2._id];

    SessionsData[0].course = courses[0]._id;
    SessionsData[1].course = courses[0]._id;
    SessionsData[2].course = courses[0]._id;
    SessionsData[3].course = courses[0]._id;
    SessionsData[4].course = courses[1]._id;
    SessionsData[5].course = courses[1]._id;
    SessionsData[6].course = courses[2]._id;

    await populateDb(Session, SessionsData);
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
 * Set up 'Specialty' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpSpecialtyData = catchAsync(async () => {
    await populateDb(Specialty, SpecialtyData);
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
    const course = await Course.findOne({ courseName: 'Mampostería industrial' });
    const user1 = await ArchitectUser.findOne({ email: 'relisib653@mugadget.com' });
    const user2 = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });
    const inscriptionData = [
        {
            course: course._id,
            user: user1._id
        },
        {
            course: course._id,
            user: user2._id
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
    await setUpInsciptionData();
    await setUpServicesData();
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
