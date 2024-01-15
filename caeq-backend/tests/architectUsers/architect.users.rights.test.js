//TODO
/*
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const ArchitectUser = require('../../models/architect.user.model');
const Attendees = require('../../models/attendees.model');
const Gatherings = require('../../models/gathering.model');

const testUserRightsAllRequirements = async () => {
    // This user has been initially set up with all requirements
    let testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    const rights = await testUser.currentRights;

    expect(rights).toEqual(true);
};

const testUserRightsNoAnnuity = async () => {
    // This user has been initially set up with all requirements
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: false, capacitationHours: 120 }
    );
    let testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    const rights = await testUser.currentRights;

    expect(rights).toEqual(false);
};

const testUserRightsNoCapacitationHours = async () => {
    // This user has been initially set up with all requirements
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 0 }
    );
    let testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    let rights = await testUser.currentRights;

    expect(rights).toEqual(false);

    // With one specialty the minimum hours is 40
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 40 }
    );
    testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    rights = await testUser.currentRights;

    expect(rights).toEqual(true);

    // With one specialty the minimum hours is 40
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 39 }
    );
    testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    rights = await testUser.currentRights;

    expect(rights).toEqual(false);

    // With no specialties the minimum hours is 0
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 20, specialties: [] }
    );
    testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    rights = await testUser.currentRights;

    expect(rights).toEqual(true);

    // With no specialties the minimum hours is 0
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 19, specialties: [] }
    );
    testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    rights = await testUser.currentRights;

    expect(rights).toEqual(false);

    await testUserRightsNoGatheringRequirements();
};

const testUserRightsNoGatheringRequirements = async () => {
    await ArchitectUser.findOneAndUpdate(
        { email: 'rigigit647@soebing.com' },
        { annuity: true, capacitationHours: 120 }
    );
    let testUser = await ArchitectUser.findOne({ email: 'rigigit647@soebing.com' });

    let rights = await testUser.currentRights;

    expect(rights).toEqual(true);

    // 5 minimum attendees in the last year, 3 must have presential modality
    // Calculate the date range for the last year
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

    // Find gatherings from the last year
    const gatherings = await Gatherings.find({
        date: { $gte: lastYearDate },
    });
    const gatheringIds = gatherings.map((gathering) => gathering._id);

    // Find attendee documents for the specific user and gatherings from the last year
    const lastYearAttended = await Attendees.find({
        idArchitect: testUser._id,
        idGathering: { $in: gatheringIds },
    });

    // Make all attendees remote
    for (attendee of lastYearAttended) {
        if (attendee.modality == 'Presencial') {
            await Attendees.findOneAndUpdate(
                { _id: attendee._id },
                { modality: 'Remoto' }
            );
        }
    }

    rights = await testUser.currentRights;

    expect(rights).toEqual(false);

    // Make all attendees presential
    for (attendee of lastYearAttended) {
        await Attendees.findOneAndUpdate(
            { _id: attendee._id },
            { modality: 'Presencial' }
        );
    }
    // Delete two to bring total down to 4
    await Attendees.findOneAndDelete({ _id: lastYearAttended[0]._id });
    await Attendees.findOneAndDelete({ _id: lastYearAttended[1]._id });

    rights = await testUser.currentRights;

    expect(rights).toEqual(false);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe('Architect User GET', () => {
    test('successful', () => testUserRightsAllRequirements());
    test('successful', () => testUserRightsNoAnnuity());
    test('successful', () => testUserRightsNoCapacitationHours());
});
*/
