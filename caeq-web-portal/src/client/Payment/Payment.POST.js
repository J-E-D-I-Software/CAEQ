import axios from 'axios';
import baseApiEndpoint from '../backendConfig';


export async function startPayment(data) {
    let endpoint = `${baseApiEndpoint}/payment/startPayment`;
    const response = await axios.post(endpoint, data, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data;
}
