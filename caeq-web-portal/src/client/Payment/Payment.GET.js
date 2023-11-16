import axios from 'axios';
import baseApiEndpoint from '../backendConfig';


export async function getAllPayments() {
    let endpoint = `${baseApiEndpoint}/payment?status=Pendiente`;
    const response = await axios.get(endpoint);
    return response.data.data.documents;
}