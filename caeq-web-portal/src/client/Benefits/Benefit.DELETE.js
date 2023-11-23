import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/** 
 * It makes a GET request to the endpoint `/benefits/${id}` and returns the response data.
 * @param {string} id - The id of the benefit.
 * @returns An object.
*/
export async function deleteBenefit(id) {
    let endpoint = `${baseApiEndpoint}/benefits/${id}`;
    await axios.delete(endpoint);
    return true;
}