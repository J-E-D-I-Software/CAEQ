const catchAsync = require('../utils/catchAsync');
const admin = require('../config/db');
const storage = admin.storage().bucket();
global.XMLHttpRequest = require('xhr2');

/**
 *
 * @param {File} object file object that will be uploaded
 * @param {resource} string name of the type of resource
 * @description - this function does the following
 * - It uploads a file to storage as an argument with the
 *  "originalname" and "buffer" as keys
 */
const uploadFile = async (file, resource) => {
    let { originalname, buffer } = file;

    const timestamp = Date.now();
    const name = originalname.split('.')[0];
    const type = file.mimetype.split('/')[1];
    const fileName = `${name}_${resource}_${timestamp}.${type}`;

    const ref = storage.file(fileName);
    await ref.save(buffer, {
        metadata: {
          contentType: file.mimetype,
        },
    });
    
    // Get the download URL
    const downloadURL = await ref.getSignedUrl({
        action: 'read',
        expires: '01-01-2500',
    });
    if (downloadURL.length > 0) {
        return downloadURL[0];
    }
    return null;
};

exports.formatImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.body.imageUrl = await uploadFile(req.file, 'image');

    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});

exports.formatPDF = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.body.LinkCV = await uploadFile(req.file, 'pdf');

    res.status(200).json({
        message: 'Archivo subido con exito',
        imageDownloadUrl: req.body.LinkCV,
    });

    // Use next when you need the url in the next controllers. Delete the response from above.
    // next();
});

exports.formatCV = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.body.linkCV = await uploadFile(req.file, 'cv');

    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});

exports.formatGenericFile = catchAsync(async (req, res, next) => {
    for (const file of req.files) {
        const [fileType, specificType] = file.mimetype.split('/');
        const fieldName = file.fieldName;
        req.body[fieldName] = await uploadFile(file, specificType);
    }
    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});

exports.formatMoreInfo = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.body.moreInfo = await uploadFile(req.file, 'info');

    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});

exports.formatRoomPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.body.roomPhoto = await uploadFile(req.file, 'photo');
});
    
    // Use next when you need the url in the next controllers. Delete the response from above.

/* A middleware that is used to format the image before it is uploaded to the server. */
exports.formatPaymentImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    // FORMAT file
    req.body.billImageURL = await uploadFile(req.file, 'bill');

    next();
});
