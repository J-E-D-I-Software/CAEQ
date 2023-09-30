import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * Sends a PATCH request to the '/caequsers/acceptadmin' endpoint with the name of the admin to accept.
 *
 * @param {string} id - The id of the admin to accept.
 * @returns {Promise} - The message from the server.
 */
export async function patchAcceptAdmin(id) {
    let endpoint = `${baseApiEndpoint}/caequsers/acceptadmin`;

    const body = {
        admin: id,
    };

    const response = await axios.patch(endpoint, body);

    return response.data;
}

/**
 * Sends a PATCH request to the '/caequsers/rejectadmin' endpoint with the name of the admin to rejed.
 *
 * @param {string} id - The id of the admin to reject.
 * @returns {Promise} - The message from the server.
 */
export async function patchRejectAdmin(id) {
    let endpoint = `${baseApiEndpoint}/caequsers/rejectadmin`;

    const body = {
        admin: id,
    };

    const response = await axios.patch(endpoint, body);

    return response.data;
}
