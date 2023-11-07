import axios from "axios";
import baseApiEndpoint from "../backendConfig";


export async function patchAcceptPayment(id) {
    let endpoint = `${baseApiEndpoint}/payment/acceptPayment`;

    const body = {
        paymentId: id,
    };

    const response = await axios.patch(endpoint, body);

    return response.data;
}


export async function patchRejectPaymenet(id) {
    let endpoint = `${baseApiEndpoint}/payment/declinePayment`;

    const body = {
        paymentId: id,
    };

    const response = await axios.patch(endpoint, body);

    return response.data;
}
