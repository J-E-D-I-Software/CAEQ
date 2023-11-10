import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a DELETE request to the endpoint `/attendees/:id` and returns the response data.
 * @returns An object.
 */
export async function deleteAttendee(id) {
    let endpoint = `${baseApiEndpoint}/attendees/${id}`;

    const response = await axios.delete(endpoint);
    return response.data;
}
