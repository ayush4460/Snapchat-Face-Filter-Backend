import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QRCode from 'qrcode';
import axios from 'axios';
import RedirectedPage from './RedirectedPage';
import Camera from './Camera';

const App = () => {
  const uniqueLink = 'https://ayush4460.github.io/';

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
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const qrCodeContainer = qrCodeContainerRef.current;

    QRCode.toCanvas(qrCodeContainer, uniqueLink, { scale: 6 }, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });

    getTotalCount();
  }, [uniqueLink]);

  const getTotalCount = async () => {
    try {
      const response = await axios.get('http://192.168.29.138:8080/api/count');
      const { count } = response.data;
      console.log(count);
      setTotalCount(count);
    } catch (error) {
      console.error('Error retrieving click count:', error);
    }
  };

  const redirectToFilters = () => {
    window.location.href = uniqueLink;
  };

  return (
    <div>
      <div className="scan-text">Scan the QR code to open the filters page</div>
      <div className="qrcode-container" onClick={redirectToFilters}>
        <canvas ref={qrCodeContainerRef} id="qrcode" />
      </div>
      <div className="count-text">Count: {totalCount}</div>
    </div>
  );
};

export default App;
