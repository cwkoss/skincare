import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Form2 from './Form2';
import Summary from './Summary'; 
import RecipeBuilder from './RecipeBuilder';
import './App.css';

function App() {
  const [goalsData, setGoalsData] = useState([]);
  const [form2Data, setForm2Data] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Welcome to the Skincare Formulation App!</h1>
            <Link to="/goals"><button>Start Form</button></Link>
          </div>
        } />
        <Route path="/goals" element={<Goals setGoalsData={setGoalsData} />} />
        <Route path="/form2" element={<Form2 setForm2Data={setForm2Data} />} />
        <Route path="/summary" element={<Summary goalsData={goalsData} form2Data={form2Data} />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
