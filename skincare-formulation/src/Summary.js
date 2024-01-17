import React from 'react';

function Summary({ form1Data, form2Data }) {
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
    </div>
  );
}

export default Summary;
