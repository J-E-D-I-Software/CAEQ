const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../config/databaseTest');
const { loginAdmin } = require('../config/authSetUp');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');

const agent = request.agent(app);

const testPostRoomOffer = async () => {
    const endpoint = '/services';

    let res = await agent.post(endpoint).send({
        name: 'Salón Epigmenio Martínez',
        cost: 1200,
        capacity: 20,
        specifications: 'Aire acondicionado, ',
        roomPhoto: null,

    })

}

