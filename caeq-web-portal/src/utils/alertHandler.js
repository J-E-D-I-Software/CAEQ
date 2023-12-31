import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

/**
 * This function is used to display a popup with a title, icon, text, and a button with a specific
 * color.
 * @param message - The message to display in the alert.
 * @param fn - The function to call when an alert is closed.
 */
export function FireError(message) {
    const swal = MySwal.fire({
        title: '¡Error!',
        icon: 'error',
        text: message,
        confirmButtonColor: '#AB3428',
    });

    return swal;
}

/**
 * It's a function that takes a message as a parameter and displays a success message using the
 * SweetAlert2 library.
 * @param message - The message you want to display.
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
 * It's a function that takes a message as a parameter and displays a loading message using the
 * SweetAlert2 library.
 * @param message - The message you want to display.
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
 * It's a function that returns a promise that resolves to a boolean value
 * @param question - The question you want to ask the user.
 * @param warning - The text that will be displayed in the body of the modal.
 * @param [confirmText=Acepto] - The text that will be displayed on the confirm button.
 * @param [rejectText=Cancelar] - The text that will be displayed in the cancel button.
 * @returns A promise.
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

/**
 * It's a function that returns a promise that resolves to a boolean value
 * @param title - The title of the notification.
 * @param icon - The icon of the notification.
 * @param position - The position of the notification.
 * @returns A promise.
 */
export async function FireNotification(title, icon = 'success', position = 'top-end') {
    return MySwal.fire({
        position: position,
        icon: icon,
        title: title,
        showConfirmButton: false,
        toast: true,
        timer: 1000,
    });
}
