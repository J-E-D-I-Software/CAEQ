const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

const connectDB = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connection to local MongoDB successful');
};

const dropDB = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
        console.log('Connection to local MongoDB stopped. Database dropped.');
    }
};

const dropCollections = async () => {
    if (mongo) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.remove();
        }
        console.log('Collections dropped');
    }
};

module.exports = { connectDB, dropDB, dropCollections };
