const request = require('supertest');
const app = require('../../app');
const User = require('../../models/caeq.user.model');
const { connectDB } = require('../config/databaseTest');
const { setUpDbWithMuckData } = require('../../models/testdata.setup');
const { loginAdmin } = require('../config/authSetUp');

const agent = request.agent(app);

/**
 * Test function for accepting and rejecting admin requests.
 * @function
 * @async
 * @throws {Error} If any of the test cases fail.
 *
 * @example
 * // Example usage:
 * testAcceptRejectAdmin();
 */
const testAcceptRejectAdmin = async () => {
    const admins = await User.find({ verified: false });

    const testAdmin1 = admins[0]._id;
    const resTest1 = await agent.patch('/caequsers/acceptadmin').send({
        admin: testAdmin1,
    });

    expect(resTest1.statusCode).toEqual(200);
    expect(resTest1.body).toBeTruthy();
    expect(resTest1.body.message).toEqual(
        'Administrador verificado. El usuario ahora cuenta con acceso al portal de administración.'
    );

    const testAdmin2 = admins[1]._id;
    const resTest2 = await agent.patch('/caequsers/rejectadmin').send({
        admin: testAdmin2,
    });

    expect(resTest2.statusCode).toEqual(200);
    expect(resTest2.body).toBeTruthy();
    expect(resTest2.body.message).toEqual(
        'Solicitud de acceso al sistema rechazada. Se ha eliminado la petición.'
    );

    const resTest3 = await agent.patch('/caequsers/acceptadmin').send({
        admin: testAdmin1,
    });

    expect(resTest3.statusCode).toEqual(400);
    expect(resTest3.body).toBeTruthy();
    expect(resTest3.body.message).toEqual(
        'No se puede realizar esta petición en este administrador.'
    );
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
    await loginAdmin(agent, 'john@example.com', 'password123');
});

describe('Caeq login successful', () => {
    test('successful', () => testAcceptRejectAdmin());
});
