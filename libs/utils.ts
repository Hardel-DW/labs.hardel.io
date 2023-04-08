import { AGO_SINCE } from '@libs/constant';

export const randomString = (length: number) => Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');
export const removeSpecialCharacters = (str: string) => str.toLowerCase().replace(/[^a-z_\s]/gi, '');
export const clx = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

// string to namespace
export const toNamespace = (str: string | undefined | null) => {
    if (!str) return;

    const regexp = new RegExp('(?<base>^[A-Za-z0-9]+:)(?<name>.*)');

    const value = str
        .toLowerCase()
        .replace(/\s/g, '_')
        .replace(/[^a-zA-Z_:]/gi, '');

    const match = value.match(regexp);
    const { base, name } = match?.groups ?? { base: '', name: '' };
    if (base && !name) {
        return;
    }

    return match ? base + name.replace(':', '') : 'minecraft:' + value;
};

export const removeNamespace = (str: string) => {
    const regexp = new RegExp('(?<base>^[A-Za-z0-9]+:)(?<name>.*)');

    const match = str.match(regexp);
    const { name } = match?.groups ?? { name: '' };

    return name;
};

/**
 * Return object with the suffix and the value
 * @param date
 */
export const timeSince = (date: Date) => {
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
