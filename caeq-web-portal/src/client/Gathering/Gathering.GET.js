import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 10;

/**
 * It makes a GET request to the endpoint `/gatherings` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllGatherings(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/gatherings?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/gatherings/:id` and returns the response data.
 * @returns An object.
 */
export async function getGathering(id) {
    let endpoint = `${baseApiEndpoint}/gatherings/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}
