export function adjustColorBrightness(hexColor: string, factor: number) {
    const normalizedFactor = Math.max(-1, Math.min(1, factor));

    if (hexColor.startsWith('#')) {
        hexColor = hexColor.slice(1);
    }

    let r = parseInt(hexColor.slice(0, 2), 16);
    let g = parseInt(hexColor.slice(2, 4), 16);
    let b = parseInt(hexColor.slice(4, 6), 16);

    r = Math.round(r * (1 + normalizedFactor));
    g = Math.round(g * (1 + normalizedFactor));
    b = Math.round(b * (1 + normalizedFactor));

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}