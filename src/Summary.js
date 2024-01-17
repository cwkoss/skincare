import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Summary({ form1Data, form2Data }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAIClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/recipe-builder'); // Replace with your actual route
    }, 5000); // 5 seconds timeout for testing purposes
  };

  const handleManualClick = () => {
    navigate('/recipe-builder'); // Replace with your actual route
  };

  return (
    <div>
      <h2>Your Selections</h2>
      <h3>Skincare Goals/Concerns:</h3>
      <ul>
        {form1Data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Selected Skincare Product:</h3>
      <p>{form2Data}</p>

      {loading ? (
        <p>Loading...</p> // Placeholder for loading spinner
      ) : (
        <>
          <button onClick={handleAIClick}>AI Recipe Generation</button>
          <button onClick={handleManualClick}>Build Recipe Manually</button>
        </>
      )}
    </div>
  );
}

export default Summary;
