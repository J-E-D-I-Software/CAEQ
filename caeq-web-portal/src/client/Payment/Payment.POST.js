import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

/**
 * Starts the payment process for a course.
 *
 * @param {string} courseId - The ID of the course for which to start the payment.
 * @param {File} paymentFile - The payment proof file.
 * @returns {Promise} A promise that resolves with the response data when the payment process is successful.
 * @throws {Error} If an error occurs during the payment process.
 */
export async function startPayment(courseId, paymentFile) {
    let endpoint = `${baseApiEndpoint}/payment/startPayment`;

    // Create a FormData object to send data with the file
    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('paymentFile', paymentFile);

    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
