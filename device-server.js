import ipc from './node_modules/node-ipc/node-ipc.js';
import { Buffer } from 'buffer';

import {bufferToHex, hexToASCII} from './helper.js'

let receivedHexData = [];
let receivedASCIIData = '';

let isBusy = false;

ipc.config.id = 'device';
ipc.config.retry = 1500;
ipc.config.rawBuffer = true;
ipc.config.encoding = 'ascii';
ipc.config.silent = true; // if false, will display Node-ipc logs


/**
 * Verifies the received hex data and execute action if the command is recognized.
 */
 async function checkCommand() {
    if (receivedHexData.length > 0 && receivedHexData[receivedHexData.length - 1] !== '0x0A') {
        return;
    }

    isBusy = true;

    if (receivedHexData[0] === '0x53') {
        executeWeightCommand();
    } else {
        console.log('Command not recognized. Operation aborted.')
    }
    receivedHexData = [];
    receivedASCIIData = '';

    isBusy = false;
}

/**
 * Executes the "weight" command. For demo purposes, the command takes 5 seconds to execute.
 */
async function executeWeightCommand() {
    console.log('Command recognized. Computing...');
    await new Promise(r => setTimeout(r, 5000));
    console.log('> S S     100 g');
}

ipc.serve(
    function(){
        ipc.server.on(
            'connect',
            function(socket){
                ipc.log('[Driver connected]', ipc.config.delay);
            }
        );

        ipc.server.on(
            'data',
            function(data,socket){

                ipc.log("Received ", data.length, " package(s)");

                // Stop command processing if device is "busy"
                if (isBusy) {
                    console.log('> S U');
                    return;
                }

                // Translate each byte in the buffer to hex and ASCII
                for (let i = 0; i < data.length; i++) {
                    let hex = bufferToHex(data[i]);

                    receivedHexData.push(hex);
                    receivedASCIIData += hexToASCII(hex);

                    console.log('Received:', receivedHexData, 'is', receivedASCIIData);
                }

                checkCommand();

                console.log('Listening.')
            }
        );
    }
);

ipc.server.start();
console.log('Device online.')
console.log('Listening.')
