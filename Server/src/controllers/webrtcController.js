const mediasoup = require("mediasoup");
const { router } = require("../config/mediasoup");

module.exports = {
  // Initialize WebRTC Transport
  async initWebRtcTransport(req, res, router) {
    const webRtcTransportOptions = {
      listenIps: [
        { ip: "127.0.0.1", announcedIp: null },
      ],
      enableUdp: true,
      enableTcp: false,
      preferUdp: true,
    };

    const webRtcTransport = await router.createWebRtcTransport(webRtcTransportOptions);

    const transportParams = {
      id: webRtcTransport.id,
      iceParameters: webRtcTransport.iceParameters,
      iceCandidates: webRtcTransport.iceCandidates,
      dtlsParameters: webRtcTransport.dtlsParameters,
    };

    // Send these transport parameters to the client through your signaling mechanism
    res.json(transportParams);
  },

  // other methods related to WebRTC like createProducer, createConsumer
};
