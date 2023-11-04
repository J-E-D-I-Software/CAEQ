import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a Post request to the endpoint `/specialties` and returns the response data.
 * @returns An array of objects.
 */
export async function createSpecialty(specialty) {
    let endpoint = `${baseApiEndpoint}/specialties`;
    const response = await axios.post(endpoint, specialty);
    if (response?.status !== 201) throw response.data;
    return response.data.data.documents;
}
