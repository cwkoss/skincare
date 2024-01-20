import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Product from './Product';
import Summary from './Summary'; 
import RecipeBuilder from './RecipeBuilder';
import './App.css';

function App() {
  const [goalsData, setGoalsData] = useState([]);
  const [productData, setProductData] = useState('');

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
        <Route path="/product" element={<Product setProductData={setProductData} />} />
        <Route path="/summary" element={<Summary goalsData={goalsData} productData={productData} />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
