import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a POST request to the endpoint `/benefits` and returns the response data.
 * @returns An object.
 */
export async function createBenefit(data) {
    let endpoint = `${baseApiEndpoint}/benefits`;
    const response = await axios.post(endpoint, data);
    return response.data.data.document;
}
