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
 *
 * Gets the accredited hours for architects in a period of time.
 *
 * @param {string} id - The ID of the course.
 * @returns {Promise} A promise that resolves with the response data when the inscribe operation is successful.
 */
export async function getCourseHours(id) {
    let endpoint = `${baseApiEndpoint}/inscription/myCourseHours/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * Gets the inscriptions of the currently authenticated architect.
 *
 * @returns {Promise} A promise that resolves with the response data when the operation is successful.
 */

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 12;

export async function getMyInscriptions(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/inscription/myInscriptions?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;
    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * Gets the inscriptions of the currently authenticated architect.
 * 
 * @returns {Promise} A promise that resolves with the response data when the operation is successful.
 */

export async function getMyInscriptionswithSessions(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/inscription/myInscriptions?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data;
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
