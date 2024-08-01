import React from 'react';
import localImage from '../assets/images/scheduled-normal1.jpg'; // Adjust the path as necessary

const ImageDisplay = () => {
  return (
    <div>
      <h2>External Image</h2>
      <img src="https://via.placeholder.com/150" alt="Placeholder" style={{ width: '150px', height: '150px' }} />

      <h2>Local Image from src</h2>
      <img src={localImage} alt="My Local Image" style={{ width: '150px', height: '150px' }} />

      <h2>Local Image from public</h2>
      <img src={`${process.env.PUBLIC_URL}/path/to/your/image.jpg`} alt="My Local Image" style={{ width: '150px', height: '150px' }} />
    </div>
  );
};

export default ImageDisplay;
