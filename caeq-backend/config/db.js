// Importing our configuration to initialize our app
const { 
    STORAGE_BUCKET,
    GOOGLE_CREDENTIALS_FILE,
    NODE_ENV
} = process.env;

// Creates and initializes a Firebase app instance. Pass options as param
let admin;
let db;

if (NODE_ENV !== 'testing') {
    // Only initialize Firebase if not running tests
    admin = require('firebase-admin');
    const credentials = require(`../keys/${GOOGLE_CREDENTIALS_FILE}`);
    
    db = admin.initializeApp({
        credential: admin.credential.cert(credentials),
        storageBucket: STORAGE_BUCKET,
    });
} else {
    // Mock firebase-admin for testing
    db = {
        storage: () => {
            bucket: () => {
                file: () => {
                    save: async () => null;
                    getSignedUrl: async () => 'https://example.com/luisgarcia-cv.pdf';
                }
            };
        }
    };
}

module.exports = db;
