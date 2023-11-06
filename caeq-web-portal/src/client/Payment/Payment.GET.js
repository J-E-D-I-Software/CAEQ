import axios from 'axios';
import baseApiEndpoint from '../backendConfig';


export async function getAllPayments() {
    let endpoint = `${baseApiEndpoint}/payment`;
    const response = await axios.post(endpoint);
    return response.data;
}