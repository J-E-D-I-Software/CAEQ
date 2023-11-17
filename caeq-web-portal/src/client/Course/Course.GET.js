import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 12;

/**
 * It makes a GET request to the endpoint `/courses` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllCourses(page = 1, filtersParams = '') {
    let endpoint = `${baseApiEndpoint}/courses?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;
    console.log(endpoint);
    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a GET request to the endpoint `/courses/:id` and returns the response data.
 * @returns An object.
 */
export async function getCourse(id) {
    let endpoint = `${baseApiEndpoint}/courses/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}
