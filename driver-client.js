import ipc from './node_modules/node-ipc/node-ipc.js';

ipc.config.id = 'driver';
ipc.config.retry = 1500;
ipc.config.rawBuffer = true;
ipc.config.encoding = 'ascii';
ipc.config.silent = true;

ipc.connectTo(
    'device',
    function(){
        ipc.of.device.on(
            'connect',
            async function(){

                ipc.log('[Connected to Device]', ipc.config.delay);
                console.log('Driver connected');
                
                const commandBuffer = Buffer.from("S\n", 'latin1');

                for (let n = 0; n < 3; n++) {
                    console.log('Sending Command: Send stable weight value');
                    for (let i = 0; i < commandBuffer.length; i++) {
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
