import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/architectusers` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllArchitectUsers(
    page = 1,
    filtersParams = '',
    paginationPageLimit = 100
) {
    let endpoint = `${baseApiEndpoint}/architectusers?page=${page}&limit=${paginationPageLimit}&${filtersParams}&sort=collegiateNumber&specialties=`;

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
    console.log('Response:', response.data.data.document);
    return response.data.data.document;
}

export async function getArchitectUsers() {
    let endpoint = `${baseApiEndpoint}/architectusers`;

    const response = await axios.get(endpoint);

    return response.data.data.documents;
}
