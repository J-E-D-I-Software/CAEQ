const request = require("supertest");
const { connectDB } = require("../config/databaseTest");
const { setUpDbWithMuckData } = require("../../models/testdata.setup");
const app = require("../../app");
const { loginAdmin } = require("../config/authSetUp");
const { beforeSnapshotConstructor } = require("firebase-functions/v1/firestore");

const agent = request.agent(app);

const testProtectionAnouncements = async () => {
    const protectedEndpoint = "/email";
    let res1 = await agent.get(`${protectedEndpoint}`).send();

    expect(res1.statusCode).toEqual(401);
    expect(res1.body.message).toEqual(
        "No has iniciado sesión, por favor inicia sesión para obtener acceso."
    );

    await loginAdmin(agent, "john@example.com", "password123");
    const protectedEndpoint2 = "/email/sendEmailToEveryone";
    let res2 = await agent.post(`${protectedEndpoint2}`).send();

    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual("Por favor ingresa un asunto y un mensaje.");
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe("Route protection successful", () => {
    test("successful", () => testProtectionAnouncements());
});
