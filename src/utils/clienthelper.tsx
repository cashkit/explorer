export function hexToU8(hashHex: string) {
    return new Uint8Array(hashHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
}

export function base64toHex(b64: string): string {
    return base64toU8(b64).reduce(reduceToHex, '')
}

export function base64toU8(b64: string) {
    const binary = atob(b64);
    const len = binary.length >>> 0;
    const v = new Uint8Array(len);
    for (let i = 0; i < len; ++i) v[i] = binary.charCodeAt(i)
    return v
}

const hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const reduceToHex = (s: string, c: number) => s + hexArray[c >>> 4] + hexArray[c & 0x0F]
export function u8toHex(u8: Uint8Array) {
    return u8.reduce(reduceToHex, '')
}