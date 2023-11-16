const factory = require('./handlerFactory.controller');
const catchAsync = require('../utils/catchAsync');
const Gathering = require('../models/gathering.model');
const Email = require('../utils/email');
const Architect = require('../models/architect.user.model');

exports.getAllGatherings = factory.getAll(Gathering);
exports.getGathering = factory.getOne(Gathering);
exports.updateGathering = factory.updateOne(Gathering);
exports.deleteGathering = factory.deleteOne(Gathering);

exports.createGathering = catchAsync(async (req, res, next) => {
    let gathering;

    try{
        gathering = await Gathering.create(req.body);

        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            const addressee = await Architect.find({email: { $eq: 'josh152002@outlook.com'}});
            const email = await Email.sendNewGatheringCreatedEmail(addressee, gathering);
        } else {
            const addressee2 = await Architect.find({ anuuity: { $eq: true } });
            const email = await Email.sendNewGatheringCreatedEmail(addressee2, gathering);
        }

    }catch(error){
        return next(new AppError('Hubo un error al enviar los correos.', 500));
    }

    res.status(201).json({
        status: 'success',
        data: { document: gathering },
    });
});