const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

/**
 * Establishes a connection to a local in-memory MongoDB server.
 */
const connectDB = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connection to local MongoDB successful');
};

/**
 * Drops the database and closes the connection to the local in-memory MongoDB server.
 */
const dropDB = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
        console.log('Connection to local MongoDB stopped. Database dropped.');
    }
};

/**
 * Drops all collections in the database.
 */
const dropCollections = async () => {
    if (mongo || mongoose.connection.readyState === 1) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
        console.log('Collections dropped');
    }
};

module.exports = { connectDB, dropDB, dropCollections };
