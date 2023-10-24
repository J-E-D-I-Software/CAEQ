const Arquitect = require('../models/architect.user.model');
const Specialty = require('../models/specialty.model');
const catchAsync = require('../utils/catchAsync');

/**
 * 
 * An aggregation that retrieves a list of specialty names 
 * that match the specialties associated with the architects
 */
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

    if (specialtyData.length === 0) {
        
        return res.status(404).json({
            status: 'error',
            message: 'No hay arquitectos registrados'
        });
    }

    /** Extract the _id values from the agrregation */
    const specialtyIds = specialtyData.map((s) => s._id);

    /** Gets all specialty names from Specialty that match the values in specialtyIds */
    const specialties = await Specialty.find({ _id: { $in: specialtyIds } });

    /** Creates a mapping from _id to specialty name */
    const specialtyNameMap = specialties.reduce((acc, specialty) => {
        acc[specialty._id] = specialty.name;
        return acc;
    }, {});

    /** Adds the specialty names to the specialtyData */
    specialtyData.forEach((s) => {
        s.name = specialtyNameMap[s._id];
    });

    
    res.status(200).json({
        status: 'success',
        data: specialtyData,
    });
});