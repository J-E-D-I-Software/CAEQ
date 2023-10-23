import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a GET request to the endpoint `/specialties` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllSpecialties() {
    let endpoint = `${baseApiEndpoint}/specialties?limit=1000`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}
