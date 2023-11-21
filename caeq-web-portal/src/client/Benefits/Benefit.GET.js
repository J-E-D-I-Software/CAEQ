import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = 100000;

/**
 * It makes a GET request to the endpoint `/benefits` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllBenefits(filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/benefits?page=1&limit=${paginationPageLimit}&${filtersParams}`;
    const response = await axios.get(endpoint);
    return response.data.data.documents;
}
