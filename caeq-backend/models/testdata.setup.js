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
    await populateDb(ArchitectUser, ArchitectUserData);
});

/**
 * Set up 'Session' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpSessionData = catchAsync(async () => {
    const courses = await Course.find();

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
 * Set up the database with mock data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 * It sets up the 'CaeqUser' data by calling 'setUpCaeqUserData' and logs a message when the test data is uploaded to the database.
 */
exports.setUpDbWithMuckData = catchAsync(async () => {
    await setUpArchitectUserData();
    await setUpCaeqUserData();
    await setUpCourseData();
    await setUpArchitectUserData();
    await setUpSessionData();
    console.log('Test data uploaded to DB');
});

exports.setUpCaeqUserData = catchAsync(async () => {
    await setUpCaeqUserData();
});
