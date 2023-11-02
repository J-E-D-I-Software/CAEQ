const request = require("supertest");
const app = require("../../app");
const { connectDB } = require("../config/databaseTest");
const { setUpDbWithMuckData } = require("../../models/testdata.setup");
const { loginAdmin } = require("../config/authSetUp");

const agent = request.agent(app);

const testGetArchitectsWithParams = (paramKey, paramValue) => async () => {
    await loginAdmin(agent, "john@example.com", "password123");
    const endpoint = `/architectusers?specialties?${paramKey}=${paramValue}`;
    const res = await agent.get(endpoint).send();

    expect(res.statusCode).toEqual(200);
    res.body.data.documents.forEach((architect) =>
        expect(architect.fullName.includes("paramValue"))
    );
    expect(res.body.data.documents);
};

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

describe("Filter Architect GET", () => {
    test("successful", testGetArchitectsWithParams("fullName[regex]", "Ana Rodríguez"));
    test(
        "successful",
        testGetArchitectsWithParams("municipalityOfLabor[regex]", "Ranchuca")
    );
    test("successful", testGetArchitectsWithParams("DRONumber[regex]", "DRO98765"));
    test("successful", testGetArchitectsWithParams("gender", "Hombre"));
    test("successful", testGetArchitectsWithParams("classification", "Docente"));
    test("successful", testGetArchitectsWithParams("memberType", "Miembro Pasante"));
    test("successful", testGetArchitectsWithParams("dateOfAdmission[gte]", "1980"));
    test("successful", testGetArchitectsWithParams("dateOfAdmission[lte]", "2002"));
    test("successful", testGetArchitectsWithParams("dateOfBirth[gte]", "1965-04-15"));
    test("successful", testGetArchitectsWithParams("dateOfBirth[lte]", "1978-05-20"));
    test(
        "successful",
        testGetArchitectsWithParams("name", "Experto en seguridad estructural")
    );
});
