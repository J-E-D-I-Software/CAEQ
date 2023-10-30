import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * Hace una solicitud POST para inscribir a un arquitecto en un curso.
 * @param {string} courseId - El ID del curso al que se inscribirá el arquitecto.
 * @returns El resultado de la solicitud POST.
 */
export async function inscribeArchitectToCourse(courseId) {
    // Asegúrate de que el endpoint esté configurado correctamente para la ruta '/inscribeTo'
    const endpoint = `${baseApiEndpoint}/inscription/inscribeTo`;
    const requestData = {
        courseId: courseId, // Pasa el ID del curso al que se desea inscribir
    };

    try {
        // Realiza la solicitud POST con los datos de inscripción
        const response = await axios.post(endpoint, requestData);
        return response.data;
    } catch (error) {
        // Manejo de errores si la solicitud falla
        throw error;
    }
}
