import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/caequsers` and returns the response data.
 * @returns An array of objects.
 */
export async function getCaeqUsers() {
    let endpoint = `${baseApiEndpoint}/caequsers`;

    const response = await axios.get(endpoint);

    console.log(response);

    return response.data.data.documents;
}
