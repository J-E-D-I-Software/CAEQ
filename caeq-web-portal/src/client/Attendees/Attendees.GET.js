import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 10;

/**
 * It makes a GET request to the endpoint `/attendees` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllAttendees(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/attendees?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;
    const response = await axios.get(endpoint);

    console.log('Respuesta de getAllAttendees:', response.data.data.documents);
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

/**
 * It makes a GET request to the endpoint `/attendees/architect/:idArchitect` and returns the response data.
 * @returns An array of objects.
 */
export async function getAttendancesByArchitect(idArchitect) {
    let endpoint = `${baseApiEndpoint}/attendees/architect/${idArchitect}`;
    const response = await axios.get(endpoint);
    console.log('enpoin', endpoint)
    console.log('Respuesta de getAttendancesByArchitect:', response.data.data.attendees);
    return response.data.data.attendees;
}
