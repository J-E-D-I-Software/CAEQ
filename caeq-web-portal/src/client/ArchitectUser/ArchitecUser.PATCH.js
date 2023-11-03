import axios from "axios";
import baseApiEndpoint from "../backendConfig";


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
        },
    });
    return response.data;
}
