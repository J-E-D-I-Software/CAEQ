import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/sessions` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllSessions(courseId) {
    let endpoint = `${baseApiEndpoint}/sessions?course=${courseId}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/sessions/:id` and returns the response data.
 * @returns An object.
 */
export async function getSession(id) {
    let endpoint = `${baseApiEndpoint}/sessions/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}
