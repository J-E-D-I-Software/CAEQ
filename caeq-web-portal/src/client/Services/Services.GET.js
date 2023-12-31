import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 4;

export async function getAllRooms(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/services?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/salon/:id` and returns the response data.
 * @returns An object.
 */
export async function getRoom(id) {
    let endpoint = `${baseApiEndpoint}/services/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}