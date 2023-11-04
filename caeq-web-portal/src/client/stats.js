import axios from 'axios';
import baseApiEndpoint from './backendConfig';

/**
 * Retrieves specialties based on collegiate number.
 * @async
 * @param {number} collegiateNumber - The collegiate number to search for.
 * @returns {Promise<Array>} - An array of specialties.
 * @throws {Error} - If no data is received.
 */
export async function getSpecialties(collegiateNumber) {
    try {
        const body = {
            specialties: collegiateNumber,
        };
        const result = await axios.get(
            `${baseApiEndpoint}/aggregations/get-specialties`,
            body
        );
        return result.data.data;
    } catch (error) {
        console.error(error);
        throw new Error('No se recibieron datos');
    }
}
