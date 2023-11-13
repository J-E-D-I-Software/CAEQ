// Importing our configuration to initialize our app
const { 
    STORAGE_BUCKET,
    GOOGLE_CREDENTIALS_FILE 
} = process.env;

// Creates and initializes a Firebase app instance. Pass options as param
const admin = require('firebase-admin');
const credentials = require(`../keys/${GOOGLE_CREDENTIALS_FILE}`);
console.log(credentials);

const db = admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: STORAGE_BUCKET,
});

module.exports = db;
