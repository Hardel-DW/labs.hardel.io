import { AGO_SINCE } from '@/libs/constant';

/**
 * Generates a random string of specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {string} - The randomly generated string.
 */
export const randomString = (length: number): string =>
    Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');

/**
 * Removes special characters from a given string.
 *
 * @param {string} str - The input string to remove special characters from.
 * @returns {string} - The input string with special characters removed.
 */
export const removeSpecialCharacters = (str: string): string => str.toLowerCase().replace(/[^a-z_\s]/gi, '');

/**
 * Concatenates non-empty strings from the given arguments.
 *
 * @param {...(string | undefined)} args - The strings to concatenate.
 * @return {string} - The concatenated string.
 */
export const clx = (...args: (string | undefined)[]): string => args.filter(Boolean).join(' ');

/**
 * Updates the given string to conform to a specific naming convention and returns the modified string.
 *
 * @param {string | undefined | null} str - The input string to be converted.
 * @returns {string} - The modified string
 */
export const toNamespace = (str: string | undefined | null): string => {
    if (!str) throw new Error('Invalid string');

    const regexp = new RegExp('(?<base>^[A-Za-z0-9]+:)(?<name>.*)');

    const value = str
        .toLowerCase()
        .replace(/\s/g, '_')
        .replace(/[^a-zA-Z_:]/gi, '');

    const match = value.match(regexp);
    const { base, name } = match?.groups ?? { base: '', name: '' };
    if (base && !name) {
        throw new Error('Invalid string');
    }

    return match ? base + name.replace(':', '') : 'minecraft:' + value;
};

/**
 * Removes the namespace from a given string.
 *
 * @param {string} str - The input string with a namespace.
 * @returns {string} The input string without the namespace.
 */
export const removeNamespace = (str: string) => {
    const regexp = new RegExp('(?<base>^[A-Za-z0-9]+:)(?<name>.*)');

    const match = str.match(regexp);
    const { name } = match?.groups ?? { name: '' };

    return name;
};

/**
 * Calculates the time duration between a given date and the current date.
 * @param {Date} date - The date to calculate the duration from.
 * @returns {Object} - An object that contains the name, suffix, and value of the time duration.
 * @property {string} name - The name of the time duration (e.g., "year", "month", "day", etc.).
 * @property {string} suffix - The suffix of the time duration (e.g., "s", "min", "hr", etc.).
 * @property {number} value - The calculated value of the time duration.
 */
export const timeSince = (date: Date): { name: string; suffix: string; value: number } => {
    let element = AGO_SINCE[AGO_SINCE.length - 1];
    const seconds = Math.floor((new Date().getTime() - (date?.getTime?.() ?? 0)) / 1000);
    for (let i = 0; i < AGO_SINCE.length; i++) {
        const value = AGO_SINCE[i].value;
        if (seconds < value) {
            element = AGO_SINCE[i - 1];
            break;
        }
    }

    const time = Math.floor(seconds / element.value);
    return {
        name: element.name,
        suffix: element.suffix,
        value: time === Infinity ? seconds : time
    };
};
