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
    console.log('Test data uploaded to DB');
});
