import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form1 from './Form1';
import Form2 from './Form2';
import Summary from './Summary'; // Make sure to create this component
import './App.css';

function App() {
  const [form1Data, setForm1Data] = useState([]);
  const [form2Data, setForm2Data] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Welcome to the Skincare Formulation App</h1>
            <Link to="/form1"><button>Start Form</button></Link>
          </div>
        } />
        <Route path="/form1" element={<Form1 setForm1Data={setForm1Data} />} />
        <Route path="/form2" element={<Form2 setForm2Data={setForm2Data} />} />
        <Route path="/summary" element={<Summary form1Data={form1Data} form2Data={form2Data} />} />
      </Routes>
    </Router>
  );
}

export default App;
