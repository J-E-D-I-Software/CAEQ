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

