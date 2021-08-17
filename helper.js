// JavaScript source code

export function readBuffer(data, hexDataArray) {
    for (let i = 0; i < data.length; i++) {

        let hex = data[i].toString(16).toUpperCase();

        while (hex.length < 2) {
            hex = "0" + hex;
        }
        hex = "0x" + hex;
        hexDataArray.push(hex);

        let test = "";

        for (let i in hexDataArray) {
            test += hexToASCII(hexDataArray[i]);
        }

        console.log('Received:', hexDataArray, 'is', test);
    }
}

function hexToASCII(hex) {
    if (hex === '0x0A') {
        return "/n";
    } else {
        return String.fromCharCode(parseInt(hex.substr(2,hex.length), 16));
    }
}
