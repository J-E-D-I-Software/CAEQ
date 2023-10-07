const request = require("supertest");
const app = require("../../app");
const { connectDB } = require("../config/databaseTest");
const { setUpDbWithMuckData } = require("../../models/testdata.setup");
const agent = request.agent(app);

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();
});

const ForgotPasswordCaeq = async () => {
    // Request to endpoint
    const resTest1 = await agent.post("/architectusers/forgot-password").send({
        email: "fogawaf506@htoal.com",
    });


    const resTest2 = await agent.post("/architectusers/forgot-password").send({
        email: "leo9ramosp@hotmail.com",
    });

    // Assertions
    expect(resTest1.statusCode).toEqual(200);
    expect(resTest2.statusCode).toEqual(404);
};

const ResetPasswordCaeq = async () => {

    let response = await agent.post("/architectusers/forgot-password").send({
        email: "fogawaf506@htoal.com",
    });
    const token = response.body.data.resetToken;

    response = await agent.patch(`/architectusers/reset-password/${token}`).send({
        [token]: token,
        password: "123456789",
        passwordConfirm: "123456789",
    }); 
  expect(response.statusCode).toEqual(200);
}


describe("Caeq forgot Password succesful", () => {
    test("successful", () => ForgotPasswordCaeq());
    test("successful", () => ResetPasswordCaeq());
});
