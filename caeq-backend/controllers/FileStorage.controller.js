const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
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

    buffer = await sharp(buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();

    const timestamp = Date.now();
    const name = originalname.split('.')[0];
    const type = originalname.split('.')[1];
    const fileName = `${name}_${resource}_${timestamp}.${type}`;

    const imageRef = storage.child(fileName);

    const snapshot = await imageRef.put(buffer);

    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
};

const createUpload = () => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(
                new AppError(
                    'El archivo no es una imagen. Intenta de nuevo.', 
                    404
                ),
                false
            );
        }
        if (file.size <= limits.fileSize){
            cb(null, true);
        } else {
            cb(
                new AppError(
                    'La imagen pesa más de 10 MB. Intenta de nuevo.',
                    404
                ),
                false
            );
        }
    };

    return multer({ storage: multerStorage, filter: multerFilter, limits: limits});
};

