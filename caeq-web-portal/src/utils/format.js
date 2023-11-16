/**
 * Formats a date string to a more readable format
 * @param {string} dateStr - the date string to be formatted
 * @returns {string} - the formatted date string
 */
export const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const formattedMonth = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ][Number(month) - 1];
    return `${day} ${formattedMonth} ${year}`;
};
