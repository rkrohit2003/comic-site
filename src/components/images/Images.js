import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Images.css";

const Images = () => {
  const location = useLocation();
  const { state } = location;

  return (
    (!state || !state.images || state.images.length === 0) ? (
      <div className="container mt-3 minH">
        <p>No images available.</p>
      </div>
    ) : (
      <div className="container mt-3 minH">
        <h2>Generated Images</h2>
        <div className="mt-3">
          {state.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Comic Panel ${index + 1}`}
              className="img-thumbnail mr-2"
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Images;
