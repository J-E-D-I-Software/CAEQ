import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a PATCH request to the endpoint `/gatherings` and returns the response data.
 * @returns An object.
 */
export default async function updateCourse(id, data) {
    let endpoint = `${baseApiEndpoint}/gatherings/${id}`;
    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const response = await axios.patch(endpoint, data, { headers: headers });
    return response.data.data.document;
}
