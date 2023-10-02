import axios from "axios";
import baseApiEndpoint from "../backendConfig";
const paginationPageLimit = process.env.PAGINATION_PAGE_LIMIT || 5;
/**
 * It makes a GET request to the endpoint `/architectusers` and returns the response data.
 * @returns An array of objects.
 */
export async function getAllArchitectUsers(page=1, filtersParams='') {
    let endpoint = `${baseApiEndpoint}/architectusers?page=${page}&limit=${paginationPageLimit}&${filtersParams}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

