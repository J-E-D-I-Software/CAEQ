import axios from 'axios';
import baseApiEndpoint from './backendConfig';

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
