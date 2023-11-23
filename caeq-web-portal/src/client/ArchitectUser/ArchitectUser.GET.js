import axios from 'axios';
import baseApiEndpoint from '../backendConfig';
const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 100;

/**
 * It makes a GET request to the endpoint `/architectusers` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllArchitectUsers(
    page = 1,
    filtersParams = '',
    pageLimit = 100
) {
    let endpoint = `${baseApiEndpoint}/architectusers?page=${page}&limit=${pageLimit}&isRequest=false&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

export async function getAllPublicArchitectUsers(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/architectusers/public?page=${page}&limit=${paginationPageLimit}&isRequest=false&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 *  It makes a GET request to the endpoint `/architectusers/:id` and returns the response data.
 * @param {string} id - The id of the architect user.
 * @returns An object.
 */
export async function getArchitectUserById(id) {
    let endpoint = `${baseApiEndpoint}/architectusers/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}

/**
 *  It makes a GET request to the endpoint `/architectusers?collegiateNumber={num}` and returns the response data.
 * @param {string} collegiateNumber - The id of the architect collegiate Number.
 * @returns An object.
 */
export async function getArchitectUserByColegiateNumber(collegiateNumber) {
    let endpoint = `${baseApiEndpoint}/architectusers?collegiateNumber=${collegiateNumber}&isRequest=false`;

    const response = await axios.get(endpoint);
    if (response.data.data.documents.length === 1) return response.data.data.documents[0];
    return null;
}

/**
 * Retrieves a list of architect users from the server.
 * @async
 * @function getArchitectUsers
 * @returns {Promise<Array>} A promise that resolves to an array of architect user documents.
 */
export async function getArchitectUsers() {
    let endpoint = `${baseApiEndpoint}/architectusers`;

    const response = await axios.get(endpoint);

    return response.data.data.documents;
}

/**
 * Retrieves a list of architect user registration requests from the server.
 * @async
 * @function getArchitectUsers
 * @returns {Promise<Array>} A promise that resolves to an array of architect user documents.
 */
export async function getArchitectRegistrationRequest() {
    let endpoint = `${baseApiEndpoint}/architectusers/registration-requests`;

    const response = await axios.get(endpoint);

    return response.data.data.documents;
}
