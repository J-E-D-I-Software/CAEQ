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
const Attendees = require('./attendees.model');
const AttendeesData = require('./data/attendee.js');
const Gathering = require('./gathering.model');
const GatheringData = require('./data/gathering.js');
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
    const architect = await ArchitectUser.find()
    //  console.log(architect[1].fullName)
    //  console.log(architect[1]._id)
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
    //console.log(AttendeesData)
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

const setUpGatheringData = catchAsync(async () => {
    await populateDb(Gathering, GatheringData);
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
    console.log('Test data uploaded to DB');
});

exports.setUpCaeqUserData = catchAsync(async () => {
    await setUpCaeqUserData();
});
