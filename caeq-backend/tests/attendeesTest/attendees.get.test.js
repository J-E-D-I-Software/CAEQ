const request = require("supertest");
const app = require("../../app");
const { connectDB } = require("../config/databaseTest");
const { setUpDbWithMuckData } = require("../../models/testdata.setup");
const { loginAdmin } = require("../config/authSetUp");

const agent = request.agent(app);

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe("Attendee Routes", () => {
    beforeAll(async () => {
        await loginAdmin(agent, "john@example.com", "password123");
    });
    test("Get all attendees", async () => {const res = await agent.get("/attendees");
        expect(res.statusCode).toEqual(200);
    });
});
