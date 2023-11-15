import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * It makes a PATCH request to the endpoint `/courses` and returns the response data.
 * @returns An object.
 */
export async function updateCourse(id, data) {
    let endpoint = `${baseApiEndpoint}/courses/${id}`;
    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const response = await axios.patch(endpoint, data, { headers: headers });
    if (response?.status !== 200) throw response.data;
    return response.data.data.document;
}

/**
 * It makes a PATCH request to the endpoint `/courses/accredited` and returns the response data.
 * @returns An object.
 */
export async function accreditedHours(id) {
    let endpoint = `${baseApiEndpoint}/courses/accredited/${id}`;

    const response = await axios.patch(endpoint);
    return response.data.data.documents;
}
