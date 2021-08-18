# LabForward Application Challenge - Node.JS

## Behaviour Description

Run device-server.js in a Node terminal, and driver-client.js in another.

- Once the driver manages to connect to the device, it will send the command "S\n" three times. 
For demo purposes, one byte of data is sent every 2s, and the client waits another 2s before starting to send the command again.

- The device will receive the data the first time, and compute the weight. For demo purposes, this computation takes 5s.
- The device will receive the data a second time while it is busy 'computing', and as such will display the "Busy" response, as defined in the balance description.
- As the device completes its computation, it will display the "Computation" response, as defined, and will be free to receive new commands.
- As I didn't implement any feedback from the device to the driver, the driver will have kept sending the rest of its buffer to the device while it was busy - the device will not recognize the command.
- The device will then be free to receive the third command from the driver.

## Additional Notes

I used the node-ipc module to write faster - the module seemed to have healthy enough NPM stats.
I didn't have time to implement tests, but, in actual production code, unit tests would have been added. In fact, the code as is would be difficult to test properly.
This code was written in (more or less) four hours (I was sadly unable to spend more time on it this week).