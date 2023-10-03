import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/architectusers` and returns the response data.
 * @returns An array of objects.
 */
export async function getArchitectUsers() {
    let endpoint = `${baseApiEndpoint}/architectusers`;

    const response = await axios.get(endpoint);

    return response.data.data.documents;
}