import axios from 'axios';
import baseApiEndpoint from '../backendConfig';


/**
 * It makes a POST request to the endpoint `/sessions` and returns the response data.
 * @returns An object.
 */
export async function createSession(data) {
    let endpoint = `${baseApiEndpoint}/sessions`;

    const response = await axios.post(endpoint, data);
    return response.data.data.document;
}
