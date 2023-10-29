import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a DELETE request to the endpoint `/sessions/:id` and returns the response data.
 * @returns An object.
 */
export async function deleteSession(id) {
    let endpoint = `${baseApiEndpoint}/sessions/${id}`;

    const response = await axios.delete(endpoint);
    return response.data;
}
