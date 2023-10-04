import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a POST request to the endpoint `/courses` and returns the response data.
 * @returns An object.
 */
export default async function createCourse(data) {
    let endpoint = `${baseApiEndpoint}/courses`;

    const response = await axios.post(endpoint, data);
    return response.data.data.document;
}

