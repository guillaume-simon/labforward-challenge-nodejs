import ipc from './node_modules/node-ipc/node-ipc.js';
import { Buffer } from 'buffer';

// Node-ipc configuration
ipc.config.id = 'driver';
ipc.config.retry = 1500;
ipc.config.rawBuffer = true;
ipc.config.encoding = 'ascii';
ipc.config.silent = true; // if false, will display Node-ipc logs

ipc.connectTo(
    'device',
    function(){
        ipc.of.device.on(
            'connect',
            async function(){

                ipc.log('[Connected to Device]', ipc.config.delay);
                console.log('Driver connected');
                
                const commandBuffer = Buffer.from("S\n", 'latin1');

                // For demo purposes, the "S\n" command is sent three times, on an interval of two seconds.
                for (let n = 0; n < 3; n++) {
                    // Send one "S\n" command.
                    console.log('Sending Command: Send stable weight value');
                    for (let i = 0; i < commandBuffer.length; i++) {
                        // For demo purposes, send a byte of the command every two seconds.
                        await new Promise(r => setTimeout(r, 2000));

                        const char = commandBuffer.subarray(i, i+1);
                        ipc.of.device.emit(
                            char
                        );
                    }

                    await new Promise(r => setTimeout(r, 2000));
                }

            }
        );
    }
);
