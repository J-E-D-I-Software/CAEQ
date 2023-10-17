const Arquitect = require('../models/architect.user.model');
const Specialty = require('../models/specialty.model');
const catchAsync = require('../utils/catchAsync');

exports.getSpecialties = catchAsync(async (req, res) => {
    
    const specialtyData = await Arquitect.aggregate([
        {
            $unwind: '$specialties',
        },
        {
            $group: {
                _id: '$specialties',
                totalUsers : { $sum: 1 },
            },
        },
    ]);

    // Extract the _id values from the aggregation result
    const specialtyIds = specialtyData.map((s) => s._id);

    // Use $lookup to fetch the names of the specialties
    const specialties = await Specialty.find({ _id: { $in: specialtyIds } });

    // Create a mapping from _id to specialty name
    const specialtyNameMap = specialties.reduce((acc, specialty) => {
        acc[specialty._id] = specialty.name;
        return acc;
    }, {});

    // Add the specialty names to the specialtyData
    specialtyData.forEach((s) => {
        s.name = specialtyNameMap[s._id];
    });

    
    res.status(200).json({
        status: 'success',
        data: specialtyData,
    });
});