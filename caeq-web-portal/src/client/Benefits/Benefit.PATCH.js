import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/** 
 * It makes a GET request to the endpoint `/benefits/${id}` and returns the response data.
 * @param {string} id - The id of the benefit.
 * @returns An object.
*/
export async function updateBenefit(id, data) {
    let endpoint = `${baseApiEndpoint}/benefits/${id}`;
    const response = await axios.patch(endpoint, data);
    return response.data.data.document;
}