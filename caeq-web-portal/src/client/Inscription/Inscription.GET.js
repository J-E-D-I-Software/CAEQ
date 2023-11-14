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

/**
 * Gets the inscriptions of the currently authenticated architect.
 * 
 * @returns {Promise} A promise that resolves with the response data when the operation is successful.
 */

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 10;

export async function getMyInscriptions(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/inscription/myInscriptions?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}


/**
 * Gets the inscriptions of architects to a course.
 *
 * @param {string} id - The ID of the course.
 * @returns {Promise} A promise that resolves with the response data when the inscribe operation is successful.
 */
export async function getInscription(id) {
    let endpoint = `${baseApiEndpoint}/inscription/${id}`;

    const response = await axios.get(endpoint);
    return response.data.document;
}
