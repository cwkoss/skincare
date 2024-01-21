import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Product from './Product';
import Summary from './Summary'; 
import RecipeBuilder from './RecipeBuilder';
import './App.css';

function App() {
  const [goalsData, setGoalsData] = useState([]);
  const [includeFragrance, setIncludeFragrance] = useState('no');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [productData, setProductData] = useState('');

  const setIncludeFragranceApp = (fragrance) => {
    setIncludeFragrance(fragrance);
  };

  const setSelectedMoodsApp = (moods) => {
    setSelectedMoods(moods);
  };

    // Style for background image
    const homePageStyle = {
      backgroundImage: 'url("/bgimg.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      textAlign: 'center',
      paddingTop: '10%',
      height: '1200px',
      color: '#61685f',
    };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={homePageStyle}>
            <h1>Welcome to the Skincare Formulation App!</h1>
            <Link to="/goals"><button className="startbutton">Design Custom <br /> Skincare Recipe</button></Link>
          </div>
        } />
        <Route path="/goals" element={
          <Goals setGoalsData={setGoalsData} 
                 setIncludeFragranceApp={setIncludeFragranceApp}
                 setSelectedMoodsApp={setSelectedMoodsApp}/>
        } />
        <Route path="/product" element={<Product setProductData={setProductData} />} />
        <Route path="/summary" element={<Summary goalsData={goalsData} 
                                                 productData={productData} 
                                                 includeFragrance={includeFragrance} 
                                                 selectedMoods={selectedMoods} />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
