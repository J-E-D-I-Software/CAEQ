import axios from 'axios';
import baseApiEndpoint from '../backendConfig';


/**
 * It makes a PATCH request to the endpoint `/sessions/:id` and returns the response data.
 * @returns An object.
 */
export async function updateSession(id, data) {
    let endpoint = `${baseApiEndpoint}/sessions/${id}`;

    const response = await axios.patch(endpoint, data);
    return response.data.data.document;
}
