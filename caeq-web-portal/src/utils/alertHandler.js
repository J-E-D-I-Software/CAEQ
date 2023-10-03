import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/**
 * SweetAlert2 instance with React support.
 * @type {object}
 */
export const MySwal = withReactContent(Swal);

/**
 * Display an error popup with a title, icon, text, and a specific button color.
 * @param {string} message - The message to display in the alert.
 */
export function FireError(message) {
    MySwal.fire({
        title: '¡Error!',
        icon: 'error',
        text: message,
        confirmButtonColor: '#AB3428',
    });
}

/**
 * Display a loading popup with a message using the SweetAlert2 library.
 * @param {string} message - The message to display in the loading popup.
 * @returns {object} - A SweetAlert2 instance.
 */
export function FireSucess(message) {
    MySwal.fire({
        title: '¡Éxito!',
        icon: 'success',
        text: message,
        confirmButtonColor: '#136F63',
    });
}

/**
 * Display a loading popup with a message using the SweetAlert2 library.
 * @param {string} message - The message to display in the loading popup.
 * @returns {object} - A SweetAlert2 instance.
 */
export function FireLoading(message) {
    return MySwal.fire({
        title: message,
        icon: 'info',
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
}

/**
 * Display a question popup with options to confirm or reject.
 * @param {string} question - The question to ask the user.
 * @param {string} warning - The text displayed in the body of the modal.
 * @param {string} [confirmText='Acepto'] - The text for the confirm button (optional).
 * @param {string} [rejectText='Cancelar'] - The text for the reject button (optional).
 * @returns {object} - A SweetAlert2 instance.
 */
export async function FireQuestion(
    question,
    warning,
    confirmText = 'Acepto',
    rejectText = 'Cancelar'
) {
    return MySwal.fire({
        title: question,
        text: warning,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EEA300',
        cancelButtonColor: '#AB3428',
        confirmButtonText: confirmText,
        cancelButtonText: rejectText,
    });
}
