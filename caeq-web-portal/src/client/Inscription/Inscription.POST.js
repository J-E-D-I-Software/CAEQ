import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * Inscribes an architect to a course.
 *
 * @param {string} courseId - The ID of the course to inscribe the architect to.
 * @returns {Promise} A promise that resolves with the response data when the inscribe operation is successful.
 * @throws {Error} If an error occurs during the inscribe operation.
 */
export async function createInscription(courseId) {
    const endpoint = `${baseApiEndpoint}/inscription/inscribeTo`;
    const requestData = {
        courseId: courseId,
    };

    try {
        const response = await axios.post(endpoint, requestData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Inscribes an architect to a course.
 *
 * @param {string} courseId - The ID of the course to inscribe the architect to.
 * @param {string} userId - The ID of the user to inscribe.
 * @returns {Promise} A promise that resolves with the response data when the inscribe operation is successful.
 * @throws {Error} If an error occurs during the inscribe operation.
 */
export async function createInscriptionArchitect(courseId, userId) {
    const endpoint = `${baseApiEndpoint}/inscription/inscribeTo`;
    const requestData = {
        course: courseId,
        user: userId,
    };

    try {
        const response = await axios.post(endpoint, requestData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
