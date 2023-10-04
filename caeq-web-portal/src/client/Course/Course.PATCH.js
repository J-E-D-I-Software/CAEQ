import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a PATCH request to the endpoint `/courses` and returns the response data.
 * @returns An object.
 */
export default async function updateCourse(id, data) {
    let endpoint = `${baseApiEndpoint}/courses/${id}`;

    const response = await axios.patch(endpoint, data);
    return response.data.data.document;
}
