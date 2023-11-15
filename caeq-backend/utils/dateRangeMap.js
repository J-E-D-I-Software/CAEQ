/**
 * A class representing a map of date ranges with associated values.
 * @class
 */
class DateRangeMap {
    /**
     * Creates an instance of DateRangeMap.
     * @constructor
     */
    constructor() {
        /** @type {Map<string, number>} */
        this.map = new Map();
    }

    /**
     * Sets the value for a given date within a predefined date range.
     * @param {Date} date - The date for which to set the value.
     * @param {number} value - The value to set for the given date.
     */
    set(date, value) {
        // Calculate the start and end of the date range (March 15 to March 14 of next year)
        const rangeStart = new Date(date.getFullYear(), 2, 15); // Month is zero-based
        const rangeEnd = new Date(date.getFullYear() + 1, 2, 14);

        // Create a key that represents the date range using a string format
        const key = `${rangeStart.toISOString()} - ${rangeEnd.toISOString()}`;

        // Store the value in the map using the key
        this.map.set(key, value);
    }

    /**
     * Adds hours to the existing value for a given date within a date range. If no
     * matching date range is found, it creates a new date range and sets the value.
     * @param {Date} date - The date for which to add hours.
     * @param {number} hours - The number of hours to add to the existing value.
     */
    add(date, hours) {
        let rangeFound = false;

        for (const [key, value] of this.map) {
            const [start, end] = key.split(' - ');
            const rangeStart = new Date(start);
            const rangeEnd = new Date(end);
            const dateObj = new Date(date);

            // Check if the date falls within the date range
            if (dateObj >= rangeStart && dateObj <= rangeEnd) {
                // Add hours to the existing value
                this.map.set(key, value + hours);
                rangeFound = true;
                break;
            }
        }

        if (!rangeFound) {
            // If no matching date range is found, create a new one and set the value
            this.set(date, hours);
        }
    }

    /**
     * Retrieves an array of objects containing start and end years along with their values.
     * @returns {Array<{ startYear: number, endYear: number, value: number }>} - Array of objects.
     */
    getYears() {
        const years = [];

        for (const [key, value] of this.map) {
            const [start, end] = key.split(' - ');
            const rangeStart = new Date(start);
            const rangeEnd = new Date(end);

            // Extract start and end years
            const startYear = rangeStart.getFullYear();
            const endYear = rangeEnd.getFullYear();

            years.push({
                startYear,
                endYear,
                value,
            });
        }

        return years;
    }
}

module.exports = DateRangeMap;
