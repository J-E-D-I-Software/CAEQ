import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = 100000;

/**
 * It makes a GET request to the endpoint `/benefits` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllBenefits(filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/benefits?page=1&limit=${paginationPageLimit}&sort=-createdAt&${filtersParams}`;
    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/benefits/${id}` and returns the response data.
 * @param {string} id - The id of the benefit.
 * @returns An object.
 */
export async function getBenefit(id) {
    let endpoint = `${baseApiEndpoint}/benefits/${id}`;
    const response = await axios.get(endpoint);
    return response.data.data.document;
}
