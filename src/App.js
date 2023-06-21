import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QRCode from 'qrcode';
// import FilterCarousel from './Carousel';
import RedirectedPage from './RedirectedPage';
import Camera from './Camera';

const App = () => {
  const uniqueLink = 'http://localhost:8080/redirected'; // Replace with your unique link

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirected = urlParams.get('redirected');

    if (redirected) {
      window.location.href = uniqueLink;
    }
  }, []);


  const generateQRCode = () => {
    const qrCodeContainer = document.getElementById('qrcode');

    QRCode.toCanvas(qrCodeContainer, uniqueLink, { scale: 6 }, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home uniqueLink={uniqueLink} />} />
        <Route path="/redirected" element={<RedirectedPage />} />
      </Routes>
    </Router>
  );
};

const Home = ({ uniqueLink }) => {
  const qrCodeContainerRef = useRef(null);

  useEffect(() => {
    const qrCodeContainer = qrCodeContainerRef.current;

    QRCode.toCanvas(qrCodeContainer, uniqueLink, { scale: 6 }, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });
  }, [uniqueLink]);

  const redirectToFilters = () => {
    window.location.href = uniqueLink;
  };

  return (
    <div>
      {/* <Camera/> */}
      <div className="scan-text">Scan the QR code to open the filters page</div>
      <div className="qrcode-container" onClick={redirectToFilters}>
        <canvas ref={qrCodeContainerRef} id="qrcode" />
      </div>
      {/* <div className="url-text">URL: {uniqueLink}</div> */}
    </div>
  );
};

export default App;
