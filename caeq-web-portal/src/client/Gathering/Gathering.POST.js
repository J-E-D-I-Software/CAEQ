import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a POST request to the endpoint `/gatherings` and returns the response data.
 * @returns An object.
 */
export default async function createCourse(data) {
    let endpoint = `${baseApiEndpoint}/gatherings`;
    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const response = await axios.post(endpoint, data, { headers });
    return response.data.data.document;
}
