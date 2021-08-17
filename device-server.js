import ipc from './node_modules/node-ipc/node-ipc.js';

import {readBuffer} from './helper.js'

var receivedHexData = [];

var isBusy = false;

ipc.config.id = 'device';
ipc.config.retry = 1500;
ipc.config.rawBuffer = true;
ipc.config.encoding = 'ascii';
ipc.config.silent = true;

 async function checkCommand() {
    if (receivedHexData[receivedHexData.length - 1] !== '0x0A') {
        return;
    }

    isBusy = true;
    if (receivedHexData[0] === '0x53') {
        console.log('Command recognized. Computing...');
        await new Promise(r => setTimeout(r, 5000));
        console.log('> S S     100 g');

    } else {
        console.log('Command not recognized. Operation aborted.')
    }
    receivedHexData = [];
    isBusy = false;
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

                if (isBusy) {
                    console.log('> S U');
                    return;
                }

                readBuffer(data, receivedHexData);

                checkCommand();

                console.log('Listening.')
            }
        );
    }
);

ipc.server.start();
console.log('Device online.')
console.log('Listening.')
