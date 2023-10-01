import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/architectusers` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllArchitectUsers() {
    let endpoint = `${baseApiEndpoint}/architectusers`;

    const response = await axios.get(endpoint);
    console.log('Response:', response.data.data.documents);
    return response.data.data.documents;
}

