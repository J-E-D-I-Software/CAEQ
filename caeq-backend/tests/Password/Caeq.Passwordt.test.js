const request = require("supertest");
const app = require("../../app");
const { connectDB } = require("../config/databaseTest");
const { setUpDbWithMuckData } = require("../../models/testdata.setup");
const CaeqUser = require("../../models/caeq.user.model");
const auth = require("../../controllers/auth.controller");
const agent = request.agent(app);

beforeAll(async () => {
    await connectDB();
    await setUpDbWithMuckData();


});



const ForgotPasswordCaeq = async () => {
    // Request to endpoint
    const resTest1 = await agent.post("/caequsers/forgot-password").send({
        email: "leo9ramosp@hotmail.com",
    });
    
    console.log("funcional",resTest1.body.resetToken)

    const resTest2 = await agent.post("/caequsers/forgot-password").send({
        email: "fogawaf506@htoal.com",
    });

    // Assertions
    expect(resTest1.statusCode).toEqual(200);
   expect(resTest2.statusCode).toEqual(404);
};


const ResetPasswordCaeq = async () => {

    const resTest1 = await agent.post("/caequsers/forgot-password").send({
        email: "leo9ramosp@hotmail.com",
    });
    
    // Obtén el token de restablecimiento de la respuesta
    const User = await CaeqUser.findOne({ email: "leo9ramosp@hotmail.com" });
    console.log("Usuario:", User);



    if (User && User.tokenExpirationDate > Date.now()) {
        const resetToken = User.changedPasswordToken;
        console.log("Token:", resetToken);

        const resetResponse = await agent.patch(`/caequsers/reset-password/${resetToken}`).send({
            password: "contra1234",
            passwordConfirm: "contra1234"
        });

    // Asegura que la solicitud de restablecimiento sea exitosa
    expect(resetResponse.body.message).toEqual('Contraseña cambiada con exito. Quiza debas iniciar sesion de nuevo');
    expect(resetResponse.statusCode).toEqual(200);
    }else {
        // Manejar el caso en el que no se encontró un usuario válido o el token ha expirado
        throw new Error("No se encontró un usuario válido o el token ha expirado.");
    }
};

describe("Caeq forgot Password succesful", () => {
    test("successful", () => ForgotPasswordCaeq());
    test("successful", () => ResetPasswordCaeq());
});
