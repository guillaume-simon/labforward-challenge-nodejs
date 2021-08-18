/**
 * Reads buffer byte and returns an hex string.
 * @param {Buffer byte} data  A byte of data from the buffer to be read.
 * @return {string} A string representing the data in hexadecimal form.
 */
export function bufferToHex(data) {
    
        let hex = data.toString(16).toUpperCase();

        while (hex.length < 2) {
            hex = "0" + hex;
        }
        hex = "0x" + hex;

        return hex;
}

/**
 * Reads an hexadecimal string and returns an ASCII char.
 * @param {string} hex  A string representing an hexadecimal value.
 * @return {char} The corresponding ASCII char to hex.
 */
export function hexToASCII(hex) {
    if (hex === '0x0A') {
        return "/n";
    } else {
        return String.fromCharCode(parseInt(hex.substr(2,hex.length), 16));
    }
}
