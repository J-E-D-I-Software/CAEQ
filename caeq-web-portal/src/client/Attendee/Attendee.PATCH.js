import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a PATCH request to the endpoint `/attendees` and returns the response data.
 * @returns An object.
 */
export default async function updateAttendee(id, data) {
    let endpoint = `${baseApiEndpoint}/attendees/${id}`;

    const response = await axios.patch(endpoint, data);
    return response.data.data.document;
}
