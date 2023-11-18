import axios from 'axios';
import baseApiEndpoint from '../backendConfig';
import { getToken } from '../../utils/auth';

/**
 * Sends a PATCH request to the '/architectusers/resetpassword/:token' endpoint to reset the user's password.
 *
 * @param {string} token - The password reset token received via email.
 * @param {string} newPassword - The new password to set.
 * @param {string} passwordConfirm - The password confirmation.
 * @returns {Promise} - The message from the server.
 */

export async function patchResetPasswordArchitec(token, newPassword, passwordConfirm) {
    let endpoint = `${baseApiEndpoint}/architectusers/reset-password/${token}`;

    const body = {
        token,
        password: newPassword,
        passwordConfirm,
    };

    const response = await axios.patch(endpoint, body);

    return response.data;
}

/**
 * Updates an architect user by ID.
 *
 * @param {number} id - The ID of the architect user to update.
 * @param {Object} data - The data to update the architect user with.
 * @returns {Promise<Object>} - A promise that resolves with the updated architect user data.
 *
 * @throws {Error} - If the request fails or the response is not in the expected format.
 *
 * @example
 * const updatedUser = await updateArchitectUserByID(123, { name: 'John Doe' });
 */
export async function updateArchitectUserByID(id, data) {
    let endpoint = `${baseApiEndpoint}/architectusers/${id}`;

    const response = await axios.patch(endpoint, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data.data.document;
}

/**
 * Accepts an architect user's request to become a member.
 * @async
 * @function getArchitectUsers
 * @returns {Promise<Array>} A promise that resolves to an array of architect user documents.
 */
export async function patchAcceptRegistration(id) {
    let endpoint = `${baseApiEndpoint}/architectusers/accept-architect/${id}`;

    const response = await axios.patch(endpoint);

    return response.data;
}

/**
 * Rejects an architect user's request to become a member.
 * @async
 * @function getArchitectUsers
 * @returns {Promise<Array>} A promise that resolves to an array of architect user documents.
 */
export async function patchRejectRegistration(id) {
    let endpoint = `${baseApiEndpoint}/architectusers/reject-architect/${id}`;

    const response = await axios.patch(endpoint);

    return response.data;
}

/**
 * Delete an architect user
 * @async
 * @function getArchitectUsers
 * @returns {Promise<Array>} A promise that resolves to an array of architect user documents.
 */
/**
 * Delete an architect user by ID.
 *
 * @async
 * @param {number} id - The ID of the architect user to delete.
 * @returns {Promise<Object>} - A promise that resolves with the deleted architect user data.
 *
 * @throws {Error} - If the request fails or the response is not in the expected format.
 */
export async function patchDeleteArchitect(id) {
    try {
        let endpoint = `${baseApiEndpoint}/architectusers/${id}`;
        console.log(patchDeleteArchitect)

        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        return response.data;
    } catch (error) {
        // Handle errors here, you might want to throw a specific error or log the details.
        throw new Error(`Error al eliminar el arquitecto${id}: ${error.message}`);
    }
}


