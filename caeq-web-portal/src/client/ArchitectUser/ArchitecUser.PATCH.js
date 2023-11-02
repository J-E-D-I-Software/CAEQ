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
