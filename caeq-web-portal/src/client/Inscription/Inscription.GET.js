import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * Gets the inscriptions of architects to a course.
 *
 * @param {string} id - The ID of the course.
 * @returns {Promise} A promise that resolves with the response data when the inscribe operation is successful.
 */
export async function getCourseInscriptions(id) {
    let endpoint = `${baseApiEndpoint}/inscription?course=${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}
