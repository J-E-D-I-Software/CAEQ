export const mockSendPaymentAcceptedAlert = jest.fn().mockImplementation(() => {return Prommise.resolve('Promesa Resuelta')});
export const mockSendPaymentRejectedAlert = jest.fn().mockImplementation(() => {return Prommise.resolve('Promesa Resuelta')});
export const mockSendAnouncementToEveryone = jest.fn();


// This is the mock for the email module
const mock = jest.fn().mockImplementation(async() => {
    return { 
        sendPaymentAcceptedAlert: await mockSendPaymentAcceptedAlert, 
        sendPaymentRejectedAlert: await mockSendPaymentRejectedAlert,
        sendAnouncementToEveryone: await mockSendAnouncementToEveryone,
    };
});



export default mock;