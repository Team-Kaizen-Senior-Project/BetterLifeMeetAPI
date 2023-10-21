/* 
This file is for configuring mediasoup. 
It creates a worker and a router.
The worker is responsible for creating the router, which is responsible for
creating transports, producers, and consumers. 
The router is exported so that it can be used in the controllers/webrtcController.js file.
*/

const mediasoup = require('mediasoup');

/*
Defines the media codecs that the server will support. The server 
will support the Opus audio codec with a clock rate 
of 48000Hz and 2 channels.
*/
const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
];

let worker = null;
let router = null;

const initializeMediaSoup = async () => {
    try {
      worker = await mediasoup.createWorker();
      console.log('mediasoup Worker created');
    
      worker.on('died', () => {
        console.error('mediasoup Worker died, exiting in a few seconds...');
        setTimeout(() => process.exit(1), 2000);
      });
    
      router = await worker.createRouter({ mediaCodecs });
      console.log('mediasoup Router created');
    } catch (error) {
      console.error('Failed to initialize mediasoup:', error);
    }
  };

module.exports = {
    initializeMediaSoup,
    getWorker: () => worker,
    getRouter: () => router,
};
