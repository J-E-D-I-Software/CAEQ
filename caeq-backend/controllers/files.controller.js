const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const { format } = require('util');

const firebase = require('../config/db'); // reference to database
require('firebase/storage'); // must be required for this to work
const storage = firebase.storage().ref(); // create a reference to storage
global.XMLHttpRequest = require('xhr2');
const limits = {
    files: 1, //allow onlyy 1 file per request
    fileSize: 10000 * 10000, // 10 MB (max file size)
};

/**
 *
 * @param {File} object file object that will be uploaded
 * @param {resource} string name of the type of resource
 * @description - this function does the following
 * - It uploads a file to storage as an argument with the
 *  "originalname" and "buffer" as keys
 */
const uploadImage = async (file, resource) => {
    let { originalname, buffer } = file;

    buffer = await sharp(buffer).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();

    const timestamp = Date.now();
    const name = originalname.split('.')[0];
    const type = file.mimetype.split('/')[1];
    const fileName = `${name}_${resource}_${timestamp}.${type}`;

    const imageRef = storage.child(fileName);

    const snapshot = await imageRef.put(buffer);

    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
};

const uploadPDF = async (file, resource) => {
    let { originalname, buffer } = file;

    const timestamp = Date.now();
    const name = originalname.split('.')[0];
    const type = file.mimetype.split('/')[1];
    const fileName = `${name}_${resource}_${timestamp}.${type}`;

    const pdfRef = storage.child(fileName);

    const snapshot = await pdfRef.put(buffer);

    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
};

exports.formatImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.body.imageUrl = await uploadImage(req.file, 'image');

    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});

exports.formatPDF = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.body.LinkCV = await uploadPDF(req.file, 'pdf');

    
    res.status(200).json({
        message: 'Archivo subido con exito',
        imageDownloadUrl: req.body.LinkCV,
    });
    

    // Use next when you need the url in the next controllers. Delete the response from above.
    // next();
});

exports.formatCV = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    console.log(req.file)
    req.body.linkCV = await uploadPDF(req.file, 'cv');

    // Use next when you need the url in the next controllers. Delete the response from above.
    next();
});
