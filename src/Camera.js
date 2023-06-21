import React, { useEffect, useRef } from "react";

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: false };

    navigator.mediaDevices.getUserMedia()
      .then((stream) => {
        // videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default Camera;