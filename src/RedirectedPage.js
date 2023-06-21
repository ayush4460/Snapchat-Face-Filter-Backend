import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleWebRTC from 'simplewebrtc';

const signalingServerURL = 'https://your-signaling-server-url.com'; // Replace with your signaling server URL

const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });

    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Camera Live Feed</h1>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

const RedirectedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize WebRTC connection
    const webrtc = new SimpleWebRTC({
      url: signalingServerURL,
      autoRequestMedia: true, // Automatically request access to media devices
    });

    // Set up event listeners
    webrtc.on('readyToCall', () => {
      // Join the room or start the connection
      webrtc.joinRoom('your-room-name');
    });

    webrtc.on('channelMessage', (peer, label, data) => {
      // Handle incoming data channel messages
      console.log(`Received message from ${peer.id}: ${data}`);
    });

    // Clean up WebRTC connection on component unmount
    return () => {
      webrtc.stopLocalVideo();
      webrtc.leaveRoom();
      webrtc.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Change the delay time as per your requirement (in milliseconds)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Camera />
    </div>
  );
};

export default RedirectedPage;
