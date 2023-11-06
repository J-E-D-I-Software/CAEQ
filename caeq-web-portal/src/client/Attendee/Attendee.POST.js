import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a POST request to the endpoint `/attendees` and returns the response data.
 * @returns An object.
 */
export default async function createAttendee(data) {
    let endpoint = `${baseApiEndpoint}/attendees`;

    const response = await axios.post(endpoint, data);
    return response.data.data.document;
}
