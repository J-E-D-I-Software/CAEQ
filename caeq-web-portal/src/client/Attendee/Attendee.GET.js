import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 10;

/**
 * It makes a GET request to the endpoint `/attendees` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllAttendees(filterParams = '') {
    let endpoint = `${baseApiEndpoint}/attendees?${filterParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/attendees/:id` and returns the response data.
 * @returns An object.
 */
export async function getAttendee(id) {
    let endpoint = `${baseApiEndpoint}/attendees/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}
